
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
    const DeleteShop = (shop_id) => {
        if (window.confirm("Do you really want to Delete this Shop ?")) {
            deleteShop(shop_id);
        }
    }
    return (
        <div className="container my-3">

            <h1>Your Shops</h1>
            <div className="container" >
                {userShops.length > 0 ? (
                    userShops.map((shop) => {
                        return <div className="col md-6" key={shop._id}>
                            <div className="card my-3" >
                                <div className="card-body mt-3">
                                    <div className="shop_cart container">
                                        <div className="shop_cart_img container">
                                            <img src={`./images/${shop.image}`} alt={`${shop.image}`} className="shop-card-image" style={{ minWidth: '220px', maxWidth: '220px', minHeight: '150px', maxHeight: '150px' }} />
                                        </div>
                                        <div className="shop_cart_text container my-2">
                                            <h5 className="card-title">Shop Name: {shop.name}</h5>
                                            <p className="card-text">Address: {shop.address}</p>
                                            <p className="card-text">Owner email: {shop.email}</p>
                                            <div className='d-flex justify-content-center'>
                                                <Link className="btn btn-warning " to={`/userShop/shopProducts/${shop._id}`} role="button">View Products</Link>
                                                <Link className="btn btn-danger mx-2" to={`/addProduct/${shop._id}`} role="button">Add Products</Link>
                                            </div>
                                            <div className="d-flex my-3 justify-content-center">
                                                <Link to={`/updateShop/${shop._id}`} style={{ color: 'black' }}><button className="btn" style={{ backgroundColor: 'pink', textDecoration: 'none' }}>Edit Shop <BiSolidEditAlt />
                                                </button></Link>
                                                <button className="btn btn-primary mx-1" onClick={() => { DeleteShop(shop._id) }} ><MdOutlineDeleteOutline />Delete Shop
                                                </button>
                                            </div>
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
