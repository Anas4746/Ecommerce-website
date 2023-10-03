
import React, { useContext, useEffect } from 'react'
import shopContext from '../context/shops/shopContext'
import { BiSolidEditAlt } from 'react-icons/bi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function UserShop() {
    const navigate = useNavigate()
    const { userShops, deleteShop, userShop } = useContext(shopContext)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            userShop()
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })
    return (
        <div className="container my-3">

            <h1>Your Shops</h1>
            <div className="container" >
                {userShops.length > 0 ? (
                    userShops.map((shop) => {
                        return <div className="col md-6" key={shop._id}>
                            <div className="card my-3" >
                                <div className="card-body">
                                    <div className="container d-flex justify-content-around">
                                        <div className="container">
                                            <img src={`./images/${shop.image}`} alt={`${shop.image}`} className="shop-card-image" />
                                        </div>
                                        <div className="container">
                                            <h5 className="card-title">{shop.name}</h5>
                                            <p className="card-text">{shop.address}</p>
                                            <p className="card-text">{shop.email}</p>
                                            <Link className="btn btn-warning " to={`/userShop/shopProducts/${shop._id}`} role="button">View Products</Link>
                                            <Link className="btn btn-danger mx-2" to={`/addProduct/${shop._id}`} role="button">Add Products</Link>
                                        </div>
                                        <div className="d-flex justify-content-between my-3">
                                            <MdOutlineDeleteOutline onClick={() => { deleteShop(shop._id) }} />
                                            <Link to={`/updateShop/${shop._id}`}><BiSolidEditAlt /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                ) : (
                    <div className="container">
                        <p>No Shop Created.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserShop
