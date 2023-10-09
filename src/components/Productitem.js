
import React, { useContext } from 'react'
import CartProductContext from '../context/cartProduct/CartProductContext'

export default function Productitem(props) {


    const { AddCartProduct } = useContext(CartProductContext)
    const { product } = props

    return (

        <div className="col-md-3">
            <div className="card my-3 " >
                <div className="card-body my-3" >
                    <div className="container justify-content-between ">
                        <div className="container">
                            <img src={`/images/${product.image}`} style={{ minWidth: '100px', maxWidth: '100px', minHeight: '100px', maxHeight: '100px' }} alt='' className="img-thumbnail" />
                        </div>
                        <div className="d-flex justify-content-between my-3">
                            <h5 className="card-title">{product.name} - <p className="card-text">${product.price}</p></h5>
                        </div>
                        <div>
                            <p className="card-text">Description: {product.description.slice(0, 15)}...

                                <p type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    See more...
                                </p>

                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                            <button onClick={() => { AddCartProduct(product._id) }} className={`btn btn-warning `}>Add to card</button>
                            <a href="/" className="btn btn-danger">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
