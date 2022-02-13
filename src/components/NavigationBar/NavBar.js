import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

export default function NavBar () {

    const[data, setData] = useState('')
    const[user, setUser] = useState('')
    const[userId, setUserId] = useState('')
    const[btnEnabled, setBtnEnabled] = useState(false)


    const onLogin = (e) => {
        e.preventDefault()
        window.location = '/auth/login'
    }

    const gotoCommunity = (e) => {
        e.preventDefault()
        window.open('https://linkedin-customer-developer-edition.na85.force.com/css/s/', '_blank')
    }


    const onLogout = (e) => {
        e.preventDefault()
        window.location = '/auth/logout'
    }

    useEffect(() => {
        console.log('---> useEffect Start')
        let date_str = new Date()
        //date_str = `${date_str.getFullYear()}-${date_str.getMonth() + 1}-${date_str.getDate()}`
        setData(date_str.toString())

        const requestOptions = ({
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        fetch('/getLoggedInUserInfo', requestOptions)
            .then(res => {
                console.log('---> res', res.status)
                if(res.ok) {
                    res.json().then(server_data => {
                        console.log('---> data', JSON.stringify(server_data))
                        setUser(server_data.display_name)
                        setBtnEnabled(true)
                        setUserId(server_data.user_id)
                    })
                }
            })
            .catch(err => {
                console.error('---> err ', err)
            })
            .finally(() => {
                console.log('fetch completed')
            })

        console.log('---> useEffect End')
    },[data, user])

    return (

        <Box sx={{ flexGrow: 1}}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton
                        size={"large"}
                        edge={"start"}
                        color={"inherit"}
                        aria-label={"menu"}
                        sx = {{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant={"h6"}
                        component={"div"}
                        sx={{flexGrow: 1}}
                    >
                        Date/Time: {data} User: {user}
                    </Typography>

                    <Button
                        disabled={btnEnabled}
                        onClick={onLogin}
                        color={"inherit"}
                    >
                        Login
                    </Button>

                    <Button
                        disabled={!btnEnabled}
                        onClick={gotoCommunity}
                        color={"inherit"}
                    >
                        Launch Community
                    </Button>

                    <Button
                        disabled={!btnEnabled}
                        onClick={onLogout}
                        color={"inherit"}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
