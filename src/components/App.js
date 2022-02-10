import React, {useEffect, useState} from "react";

export default function App () {

    const[data, setData] = useState('')
    useEffect(() => {
        console.log('---> useEffect Start')
        let date_str = new Date()
        //date_str = `${date_str.getFullYear()}-${date_str.getMonth() + 1}-${date_str.getDate()}`
        setData(date_str.toString())
        console.log('---> useEffect End')
    },[data])

        return(
            <div>
                {data} react app component
            </div>
        )
}


/*
Reference Material
https://dev.to/lschwall/make-a-react-app-with-webpack-babel-and-express-30n8
*/
