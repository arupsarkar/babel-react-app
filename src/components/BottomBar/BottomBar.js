import React, {useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore'

export default function BottomBar () {

    const [value, setValue] = useState('')
    useEffect(() => {
        setValue('Logged in as Arup Sarkar')
    })
    return (
        <Paper sx={{position: 'fixed', bottom: 0, left:0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction label={value} icon={<RestoreIcon/>}/>
            </BottomNavigation>
        </Paper>

    )
}
