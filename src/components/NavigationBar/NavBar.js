import React, {useContext, useEffect, useState} from "react";
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from "react-redux";
import { logged_in, logged_out } from "../../features/user/userSlice";

export default function NavBar () {

    const[data, setData] = useState('')
    const[user, setUser] = useState(null)
    const[userId, setUserId] = useState('')
    const[btnEnabled, setBtnEnabled] = useState(false)
    const[avatarUrl, setAvatarUrl] = useState('')

    const user_status = useSelector((state) => state.user.active)
    const dispatch = useDispatch()

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

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
        console.log('---> useEffect Start, status ', user_status ? 'On' : 'Off')
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
                        setAvatarUrl(server_data.photos.picture)

                        dispatch(logged_in(server_data))
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
                        User: {user} {user_status ? 'On' : 'Off'}
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


                    {btnEnabled &&
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                        >
                            <Avatar
                                alt={user}
                                src={avatarUrl}
                            >
                            </Avatar>
                        </StyledBadge>
                    }
                    {
                        !btnEnabled &&
                            <Avatar
                                alt={user}
                                src={avatarUrl}
                            >

                            </Avatar>
                    }

                </Toolbar>
            </AppBar>
        </Box>

    )
}
