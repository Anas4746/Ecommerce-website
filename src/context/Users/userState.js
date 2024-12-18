
import React, { useState } from 'react'
import UserContext from './userContext'

const userdata = {}

export default function UserState(props) {
    const host = "http://localhost:5000"

    const [user, setUser] = useState(userdata)

    const getUser = async () => {

        const response = await fetch(`${host}/getuser`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const data = await response.json()
        // console.log(data)
        if (JSON.stringify(data) !== JSON.stringify(user)) {
            setUser(data);
        }
    }

    const userNull = () => {
        setUser(userdata)
    }

    return (
        <div>
            <UserContext.Provider value={{ getUser, user, userNull }}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}
