
import React, { useContext, useEffect } from 'react'
import shopContext from '../context/shops/shopContext'
// import { BiSolidEditAlt } from 'react-icons/bi'
// import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Shop() {
    const { shops, getShop } = useContext(shopContext)

    useEffect(() => {
        getShop()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container my-3">

            <h1>All Shops</h1>
            <div className="container" >
                {shops.map((shop) => {

                    return <div className="col md-6" key={shop._id}>
                        <div className="card my-3" >
                            <div className="card-body">
                                <div className="shop-cart container justify-content-around">
                                    <div className="container my-3">
                                        <Link to={`/shopProducts/${shop._id}`} style={{ textDecoration: 'none' }}>
                                            <img src={`./images/${shop.image}`} alt={`${shop.image}`} className="shop-card-image" /></Link>
                                    </div>
                                    <div className="container my-3">
                                        <p>
                                            <Link to={`/shopProducts/${shop._id}`} style={{ textDecoration: 'none' }}>
                                                <h5 className="card-title"><b style={{ color: 'black' }}>Shop Name: </b> {shop.name}</h5></Link></p>
                                        <b><span>Address: </span></b>
                                        <p className="card-text">{shop.address}</p>
                                        <b><span>Owner email: </span></b>
                                        <p className="card-text">{shop.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

