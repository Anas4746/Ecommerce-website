
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
                                        <img src={`/images/${product.image}`} alt={product.image} style={{ minWidth: '120px', maxWidth: '120px', minHeight: '120px', maxHeight: '120px' }} className="img-thumbnail" />
                                        <div className="d-flex justify-content-between my-3">
                                            <h5 className="card-title">{product.name} - <p className="card-text">${product.price}</p></h5>
                                        </div>

                                        <div>
                                            <p className="card-text">Description: {product.description.slice(0, 15)}...

                                                <p type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                    See more...
                                                </p>

                                                <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">{product.name}</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                Description: {product.description}
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </p></div>
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
