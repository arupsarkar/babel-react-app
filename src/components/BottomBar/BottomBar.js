import React, {useContext, useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore'
import { useSelector } from 'react-redux'

export default function BottomBar () {

    const[userId, setUserId] = useState('')
    const user_details = useSelector((state) => state.user.user_id)

    useEffect(() => {
        console.log('--->before useEffect in bottom bar ', userId)
        setUserId(new Date().toLocaleString() + ' ' + user_details)
        console.log('--->after useEffect in bottom bar ', userId)
    },[userId, user_details])
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
