import React, { useContext, useEffect } from 'react'
import productContext from '../context/products_data/productContext'
import Product from './Product'

export default function Home() {
    //const shops = useContext(shopContext)
    const { getProduct } = useContext(productContext)
    // console.log(token)
    useEffect(() => {
        getProduct()
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-interval="500">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/Salesimg_1st" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/Salesimg_3st" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/Salesimg_2st" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container my-3">
                <h1>Products</h1>
                {/* <div className="container" >
                {shops.map((shop) => {
                    return <h3>{shop.name}</h3>
                })}
            </div> */}
                <Product />
            </div>
        </div>
    )
}
