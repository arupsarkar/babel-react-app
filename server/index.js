const express = require('express');
const path = require('path'); // NEW

const app = express();
const port = process.env.PORT || 3000;
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

app.get('/auth/login', (req, res, next) => {
    console.log('inside auth login')
    res.json({payload: 'from server auth login'})
})

app.get('/auth/callback', async (req, res, next) => {
    console.log('inside auth callback')
    res.send('auth callback')
})


app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
