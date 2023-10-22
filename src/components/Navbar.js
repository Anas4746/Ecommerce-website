import React, { useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineShop } from 'react-icons/ai'
// import User from './User'
import { LiaShoppingCartSolid } from 'react-icons/lia'
import userContext from '../context/Users/userContext'
import CartProductContext from '../context/cartProduct/CartProductContext'

export default function Navbar() {
    const { cartProducts } = useContext(CartProductContext)
    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const { getUser, user } = useContext(userContext)
    const navigate = useNavigate()
    // const [displayCard, setdisplayCard] = useState()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()
        }
        // eslint-disable-next-line
    }, [cartProducts])

    // const userProfile = () => {
    //     setdisplayCard('get')
    // }

    const logout = () => {
        localStorage.removeItem('token')
        getUser()
        navigate('/')
        // setdisplayCard('none')
    }

    return (
        <>
            <div className='top-bar'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className='d-flex'>
                            <button className="navbar-toggler" style={{ display: 'none' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="navbar-brand ms-3">Shofy.</a>
                        </div>
                        <div className="user_icon_cart mx-3">
                            <NavLink className="nav-link dropdown-toggle me-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaRegUser className="user-icon text-black"
                                    style={{ fontSize: '25px' }} />
                            </NavLink>
                            <ul className="user_dropdown dropdown-menu" aria-labelledby="navbarDropdown">
                                {!localStorage.getItem('token') ?
                                    <>
                                        <li><NavLink className="dropdown-item btn btn-primary" to="/login" role="button">Login</NavLink></li>
                                        <li><NavLink className="dropdown-item btn btn-primary mx-2" to="/signup" role="button">SignUp</NavLink></li>
                                    </> :
                                    <>
                                        {/* <li><h5 className="dropdown-item">Email: {user.email}</h5></li> */}
                                        <li><NavLink className='nav-link' to='/addShop'>
                                            <span className='create-shop'>
                                                Create Shop
                                            </span>
                                        </NavLink></li>
                                        <li><NavLink className="btn border-0 " to="/userShop" role="button">Your Shops</NavLink></li>
                                        <li><div className="modal-body">
                                            Total Shop: {user.farms ? user.farms.length : 0}
                                        </div></li>
                                        <li><button type="button" className="btn btn-primary mt-2" onClick={logout} data-bs-dismiss="modal">Logout</button></li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </>
                                }</ul>
                            <NavLink className="shop-user me-3" to={localStorage.getItem('token') ? '/userCart' : '/login'} >
                                <LiaShoppingCartSolid className="cart-icon display-6 text-danger" /><sup className="sup-text text-black text-decoration-none">{user.cartProduct ? user.cartProduct.length : 0}</sup>
                            </NavLink>
                        </div>
                        <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link-user" to="/">Home </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link-user" to="/shops">Shops</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link-user" to="/about">About</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
