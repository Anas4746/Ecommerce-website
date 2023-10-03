
import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/Users/userContext'
import { useNavigate } from 'react-router-dom'

export default function User() {
    // const host = "http://localhost:5000"
    const { getUser, user } = useContext(userContext)
    // const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [displayCard, setdisplayCard] = useState('block')
    // const [logout, setlogout] = useState(false)


    const logout = () => {
        navigate('about')
        localStorage.removeItem('token')
        setdisplayCard('none')

    }


    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const response = await fetch(`${host}/getuser`, {
    //             method: 'POST',
    //             headers: {
    //                 'auth-token': localStorage.getItem('token')
    //             }
    //         })
    //         const data = await response.json()
    //         // console.log(data)
    //         setUser(data)
    //         // console.log(user)
    //     }
    //     fetchUsers()

    // }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('User Details')
            getUser()
        }

        // eslint-disable-next-line
    }, [])

    // console.log(user)

    return (
        <div className={`d-${displayCard}`}>
            <div className={`card`}>
                <div className="card-body">
                    <h5 className="card-title">{user.email}</h5>
                    <p className="card-text">{user.farms}</p>
                    <p className="card-text">User Product no.</p>
                    <button className="btn btn-primary" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
