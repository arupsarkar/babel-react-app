import React, {createContext, useEffect, useState} from "react";
import {Box, Button, Card, Container, Paper} from "@mui/material";
import BottomBar from "./BottomBar/BottomBar";
import NavBar from "./NavigationBar/NavBar";

export const UserContext = createContext()

export default function App () {
        return(
            <div>
                <NavBar/>
                <BottomBar/>
            </div>
        )
}


/*
Reference Material
https://dev.to/lschwall/make-a-react-app-with-webpack-babel-and-express-30n8
*/
