
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/Users/userContext'


export default function UserLogin() {

    const [credential, setCredential] = useState({ email: '', password: '' })
    const { getUser } = useContext(userContext)
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: credential.email, password: credential.password
            })
        })
        const data = await response.json();
        // console.log(data)
        if (data.success.success === true) {
            localStorage.setItem('token', data.authtoken)
            // console.log(data.authtoken)
            getUser()
            navigate('/userShop')
        } else {
            alert('Invalid credentials')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-5'>
            <div className="container text-center"><h1><b>Login</b></h1></div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credential.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-danger ms-3">Demo User</button>
            </form>
        </div>
    )
}
