
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
                                <div className="container d-flex justify-content-around">
                                    <div className="container">
                                        <img src={`./images/${shop.image}`} alt={`${shop.image}`} className="shop-card-image" />
                                    </div>
                                    <div className="container my-3">
                                        <p>
                                            <h5 className="card-title ">Shop Name: <Link to={`/shopProducts/${shop._id}`}>{shop.name}</Link></h5></p>
                                        <p className="card-text">Address: {shop.address}</p>
                                        <p className="card-text">Owner email: {shop.email}</p>
                                    </div>
                                    {/* <div className="d-flex justify-content-between my-3">
                                        <MdOutlineDeleteOutline onClick={() => { deleteShop(shop._id) }} />
                                        <Link to={`/updateShop/${shop._id}`}><BiSolidEditAlt /></Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

