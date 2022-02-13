import React, {useContext, useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore'
import {UserContext} from "../App";

export default function BottomBar () {

    const[userId, setUserId] = useState('')
    useEffect(() => {
        console.log('--->before useEffect in bottom bar ', userId)
        setUserId(new Date().toLocaleString())
        console.log('--->after useEffect in bottom bar ', userId)
    },[userId])
    return (
        <Paper sx={{position: 'fixed', bottom: 0, left:0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={userId}
                onChange={(event, newValue) => {
                    newValue = new Date().toLocaleString()
                    setUserId(newValue)
                }}
            >
                <BottomNavigationAction label={userId} icon={<RestoreIcon/>}/>
            </BottomNavigation>
        </Paper>

    )
}
