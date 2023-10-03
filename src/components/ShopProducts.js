
import React, { useContext, useEffect } from 'react'
import productContext from '../context/products_data/productContext'
import { useParams } from 'react-router-dom';

export default function ShopProducts() {
    const { shopProduct, getShopProducts } = useContext(productContext)
    const { shop_id } = useParams();
    useEffect(() => {
        getShopProducts(shop_id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <div className="row my-3">
                <h1>Shop name</h1>
                {shopProduct.length > 0 ? (
                    shopProduct.map((product) => {

                        return <div className="container col-md-3" key={product._id}>
                            <div className="card my-3 " >
                                <div className="card-body my-3">
                                    <div className="container justify-content-between ">
                                        <img src={`../images/${product.image}`} alt={product.image} style={{ minWidth: '120px', maxWidth: '120px', minHeight: '120px', maxHeight: '120px' }} className="img-thumbnail" />
                                        <div className="d-flex justify-content-between my-3">
                                            <h5 className="card-title">{product.name}</h5>
                                        </div>
                                        <p className="card-text">${product.price}</p>
                                        <p className="card-text">{product.description}</p>
                                        <div className="d-flex justify-content-between">
                                            <a href="/" className="btn btn-warning">Add to card</a>
                                            <a href="/" className="btn btn-danger">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                ) : <div className="container">
                    <p>No Product Added</p>
                </div>
                }
            </div>
        </div>
    )
}
