import React, {useEffect, useState} from "react";
import {Box, Button, Card, Container, Paper} from "@mui/material";
import BottomBar from "./BottomBar/BottomBar";
import NavBar from "./NavigationBar/NavBar";

export default function App () {

    const[data, setData] = useState('')
    const[user, setUser] = useState('')


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

        return(


            <div>
                <NavBar/>
                {data} react app component
                <div>
                    Welcome {user}
                </div>



                <div>



                </div>
                <div>
                    <Container maxWidth="sm">
                        <Paper elevation={2}>
                            <Button variant={"contained"} onClick={gotoCommunity}>
                                Login to Community
                            </Button>
                        </Paper>
                    </Container>
                </div>

                <div>
                    <Container maxWidth="sm">
                        <Paper elevation={2}>
                            <Button variant={"contained"} onClick={onLogout}>
                                Logout
                            </Button>
                        </Paper>
                    </Container>
                </div>
                <div>
                    <BottomBar/>
                </div>

            </div>

        )
}


/*
Reference Material
https://dev.to/lschwall/make-a-react-app-with-webpack-babel-and-express-30n8
*/
