import React, {useEffect, useState} from "react";

export default function App () {

    const[data, setData] = useState('')
    const[user, setUser] = useState('')


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
        fetch('/auth/login', requestOptions)
            .then(res => {
                console.log('---> res', res.status)
                if(res.ok) {
                    res.json().then(server_data => {
                        console.log('---> data', JSON.stringify(server_data))
                        setUser(server_data.payload)
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
                {data} react app component
                <div>
                    Welcome {user}
                </div>
            </div>

        )
}


/*
Reference Material
https://dev.to/lschwall/make-a-react-app-with-webpack-babel-and-express-30n8
*/
