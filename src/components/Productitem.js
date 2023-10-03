
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
                        <img src={`./images/${product.image}`} style={{ minWidth: '100px', maxWidth: '100px', minHeight: '100px', maxHeight: '100px' }} alt='' className="img-thumbnail" />
                        <div className="d-flex justify-content-between my-3">
                            <h5 className="card-title">{product.name}</h5>
                        </div>
                        <p className="card-text">Description: {product.description.length < 20 ? product.description :
                            <div>
                                {/* Button trigger modal  */}
                                <button type='button' className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                    See more...
                                </button>

                                {/* Modal */}
                                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                {product.description}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}</p>
                        <p className="card-text">${product.price}</p>
                        <div className="d-flex justify-content-between">
                            <button onClick={() => { AddCartProduct(product._id) }} className={`btn btn-warning `}>Add to card</button>
                            {/* <Link className="btn btn-warning " to={`/userShop/shopProducts/${shop._id}`} role="button">Add to card</Link> */}
                            <a href="/" className="btn btn-danger">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
