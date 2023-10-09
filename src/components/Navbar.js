import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
// import User from './User'
import { LiaShoppingCartSolid } from 'react-icons/lia'
import userContext from '../context/Users/userContext'

export default function Navbar() {

    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const { getUser, user } = useContext(userContext)
    const navigate = useNavigate()
    const [displayCard, setdisplayCard] = useState('none')

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     console.log('Token:', token);
    //     setIsLoggedIn(!!token);
    // }, [isLoggedIn]);

    // useEffect(() => {
    //     // Periodically check localStorage for changes
    //     const checkLocalStorage = () => {
    //         const token = localStorage.getItem('token');
    //         setIsLoggedIn(!!token);
    //     };

    //     // Set up an interval to check localStorage every few seconds
    //     const interval = setInterval(checkLocalStorage, 2000); // Check every 2 seconds

    //     // Clear the interval when the component unmounts
    //     return () => clearInterval(interval);
    // }, [isLoggedIn]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()

        }
        // eslint-disable-next-line
    }, [displayCard])

    const userProfile = () => {
        if (displayCard === 'none') {
            setdisplayCard('block')
        } else if (displayCard === 'block') {
            setdisplayCard('none')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
        setdisplayCard('none')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">

                <NavLink className="navbar-brand" to="/"><h2 className='text-bold mx-5' style={{ color: '#820000' }}>Shofy.</h2></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <form className="form-inline my-2 my-lg-0 d-flex justify-content-between">

                    <input className="form-control mr-sm-2 mx-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success mx-3 my-sm-0" type="submit">Search</button>
                </form>

                <NavLink className='nav-link mx-2' to={localStorage.getItem('token') ? '/addShop' : '/login'}><button type="button" className="btn btn-success">{!localStorage.getItem('token') ? 'Become a Seller' : 'Create your Shop'}</button></NavLink>
                {!localStorage.getItem('token') ?
                    <div className="">
                        <NavLink className="btn btn-primary " to="/login" role="button">Login</NavLink>
                        <NavLink className="btn btn-primary mx-2" to="/signup" role="button">SignUp</NavLink>
                    </div>
                    :
                    <div className="">
                        <NavLink className="btn btn-primary " to="/userShop" role="button">Your Shops</NavLink>
                        <NavLink className="btn btn-light mx-3" onClick={userProfile} ><CgProfile /></NavLink>
                    </div>
                }

                <NavLink className="btn btn-warning " to={localStorage.getItem('token') ? '/userCart' : '/login'} >
                    <LiaShoppingCartSolid className="display-8" />
                </NavLink>
                <span class="badge rounded-pill bg-danger badge-light" style={{ marginLeft: '0px', fontWeight: '400', marginBottom: '50px' }}>{user.cartProduct ? user.cartProduct.length : 0}</span>

                <div className={`container d-${displayCard}`}>
                    <div className={`card`}>
                        <div className="card-body">
                            <h5 className="card-title">{user.email}</h5>
                            <p className="card-text">{user.farms ? user.farms.length : 0}</p>
                            <p className="card-text">0</p>
                            <button className="btn btn-primary" onClick={logout}>Logout</button>
                        </div>
                    </div>
                    {/* <User /> */}
                </div>
            </nav>
            <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/shops">Shops</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>

                </ul>

            </div>

        </div>
    )
}
