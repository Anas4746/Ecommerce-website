
import React, { useContext, useEffect } from 'react'
import productContext from '../context/products_data/productContext'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { BiSolidEditAlt } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom';

export default function UserShopProducts() {
    const { shopProduct, getShopProducts, deleteProduct } = useContext(productContext)
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

                        return <div className="col-md-3" key={product._id}>
                            <div className="card my-3 card-fixed-height" >
                                <div className="card-body my-3">
                                    <img src={`/images/${product.image}`} style={{ minWidth: '100px', maxWidth: '100px', minHeight: '100px', maxHeight: '100px' }} alt={product.image}
                                        //  {`../images/${product.image}`}
                                        onError={(e) => {
                                            console.error('Error loading image:', e);
                                        }}
                                    />
                                    <div className="container justify-content-between ">
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
                                        <div className="container text-center">
                                            <Link to={`/product/${product._id}`} className="btn btn-warning">Edit Product <BiSolidEditAlt /></Link>
                                            <Link onClick={() => { deleteProduct(product._id) }} className="btn btn-danger my-2">Delete Product <MdOutlineDeleteOutline /></Link>
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
