import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineShop } from 'react-icons/ai'
// import User from './User'
import { LiaShoppingCartSolid } from 'react-icons/lia'
import userContext from '../context/Users/userContext'

export default function Navbar() {

    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const { getUser, user } = useContext(userContext)
    const navigate = useNavigate()
    const [displayCard, setdisplayCard] = useState()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()

        }
        // eslint-disable-next-line
    }, [displayCard])

    const userProfile = () => {
        setdisplayCard('get')
    }

    const logout = () => {
        localStorage.removeItem('token')
        getUser()
        navigate('/')
        setdisplayCard('none')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">

                <NavLink className="navbar-brand" to="/"><h2 className='text-bold mx-5' style={{ color: '#820000' }}>Shofy.</h2></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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

                <form className="form-inline my-2 my-lg-0 d-flex justify-content-between mx-5">

                    <input className="form-control display-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '400px' }} />
                    <button className="btn btn-outline-success mx-1 my-sm-0 c display-6">Search</button>

                </form>
                <NavLink className='nav-link mx-2 ' to={localStorage.getItem('token') ? '/addShop' : '/login'}><button type="button" className="btn border-0">{!localStorage.getItem('token') ? 'Become a Seller' : (
                    <span >
                        <AiOutlineShop className='display-6 me-1' />
                        Create Your Shop
                    </span>
                )}</button></NavLink><span > | </span>
                {!localStorage.getItem('token') ?
                    <div className="">
                        <NavLink className="btn btn-primary " to="/login" role="button">Login</NavLink>
                        <NavLink className="btn btn-primary mx-2" to="/signup" role="button">SignUp</NavLink>
                    </div>
                    :
                    <div className="">
                        <NavLink className="btn mx-2 border-0 " to="/userShop" role="button">Your Shops</NavLink>
                        <NavLink className="mx-3" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdropUser" onClick={userProfile}><FaRegUser className="text-black"
                            style={{ fontSize: '25px' }} /></NavLink>
                    </div>
                }

                <NavLink to={localStorage.getItem('token') ? '/userCart' : '/login'} >
                    <LiaShoppingCartSolid className="display-6 text-danger" /><sup className="me-4 text-black text-decoration-none"><span style={{ fontSize: 'large' }}>{user.cartProduct ? user.cartProduct.length : 0}</span></sup>
                </NavLink>


                <div className="modal fade" id="staticBackdropUser" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{user.email}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Total Shop: {user.farms ? user.farms.length : 0}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={logout} data-bs-dismiss="modal">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <User /> */}

            </nav>

        </div>
    )
}
