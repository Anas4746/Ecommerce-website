
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserSignup() {

  const [credential, setCredential] = useState({ email: '', password: '' })
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credential.email, password: credential.password
      })
    })
    const data = await response.json();
    console.log(data)
    if (data.success) {
      navigate('/')
    } else {
      alert('Username taken')
    }
  }
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-5'>
      <div className="container text-center"><h1><b>Sign Up</b></h1></div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
