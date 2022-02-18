import React from "react";
import BottomBar from "./BottomBar/BottomBar";
import NavBar from "./NavigationBar/NavBar";
import store from "../store/store";
import { Provider } from "react-redux";


export default function App () {
        return(
            <Provider store={store}>
                <div>
                    <NavBar/>
                    <BottomBar/>
                </div>
            </Provider>
        )
}


/*
Reference Material
https://dev.to/lschwall/make-a-react-app-with-webpack-babel-and-express-30n8
*/
