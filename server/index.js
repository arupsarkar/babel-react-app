const express = require('express');
const path = require('path'); // NEW
const jsforce = require('jsforce')
const session = require('express-session')

require('dotenv').config()
console.log('---> process.env.loginurl', process.env.loginUrl)
if(!(process.env.loginUrl && process.env.consumerKey)) {
    console.error('Cannot start up, prcess parameters missing')
    process.exit(-1)
}

const oauth2 = new jsforce.OAuth2({
    loginUrl: process.env.loginUrl,
    clientId: process.env.consumerKey,
    clientSecret: process.env.consumerSecret,
    redirectUri: process.env.callbackUrl
})

const app = express();
const port = process.env.PORT || 8080;

app.use(
    session({
        secret: process.env.sessionSecretKey,
        cookie: {secure: process.env.isHttps === true},
        resave: false,
        saveUninitialized: false
    })
)

const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const mockResponse = {
    foo: 'bar',
    bar: 'foo'
};
app.use(express.static(DIST_DIR)); // NEW
app.get('/api', (req, res) => {
    res.send(mockResponse);
});
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
});


const getSession = (req, res) => {
    const session = req.session
    if(!session.sfdcAuth) {
        res.status(401).send('no active session')
        return null
    }
    return session
}

const resumeSalesforceConnection = (session) => {
    return new jsforce.Connection({
        instanceUrl: session.sfdcAuth.instanceUrl,
        accessToken: session.sfdcAuth.accessToken,
        version: process.env.apiVersion
    })
}

app.get('/auth/login', (req, res, next) => {
    console.log('inside auth login')
    res.redirect(oauth2.getAuthorizationUrl({scope: 'api'}))
})

app.get('/auth/callback', async (req, res, next) => {
    console.log('inside auth callback')
    if(!req.query.code) {
        res.status(500).send('Failed to get auth code from server callback')
        return
    }

    //Authenticate with OAuth
    const conn = new jsforce.Connection({
        oauth2: oauth2,
        version: process.env.apiVersion
    })

    await conn.authorize(req.query.code, (error, userInfo) => {
        if (error) {
            console.error('Salesforce authorization error', JSON.stringify(error))
            res.status(500).json(error)
            return
        }

        req.session.sfdcAuth = {
            instanceUrl: conn.instanceUrl,
            accessToken: conn.accessToken
        }

        return res.redirect('/index.html')
    })
})


app.get('/auth/logout', async (req, res, next) => {
    let status
    const session = await getSession(req, res)
    if(session == null) {
        return
    }
    const conn = await resumeSalesforceConnection(session)
    console.log('Access token ', conn.accessToken)
    //single logout
    //get the current auth-session of the logged in user, delete all entries from AuthSession Object
    const usersId = '0051U000000qNoDQAU'
    conn.sobject('Single_logout_Event__e')
        .create({UserId__c: usersId}, (err, ret) => {
            if(err) {
                console.error('---> error deleting data ', JSON.stringify(err))
                return next()
            }
            console.log('--> Success', JSON.stringify(ret))
        })

    //now kill the web session
    await conn.logout((error) => {
        if(error) {
            console.error('Salesforce OAuth revoke errors', JSON.stringify(error))
            return
        }

    }).then(r => {
        console.error('Salesforce OAuth revoke ', JSON.stringify(r))
    })

    // destroy server-side session
    await session.destroy((error) => {
        if(error) {
            console.error('Salesforce session destruction error', JSON.stringify(error))
        }else {
            console.log('---> session destroyed...', session)
        }
    })

    //Redirect to the app main page
    return res.redirect('/index.html')
})

app.get('/getLoggedInUserInfo', async (req, res, next) => {
    const session = getSession(req, res)
    if(session == null) {
        return
    }
    const conn = resumeSalesforceConnection(session)
    await conn.identity((error, response) => {
        if(error) {
            console.error('Cannot get user info', JSON.stringify(error))
        }
        console.log('---> user info ', JSON.stringify(response))
        res.json(response)
    })
})


app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
