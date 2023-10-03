
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
                                    <img src={`./images/${product.image}`} style={{ minWidth: '100px', maxWidth: '100px', minHeight: '100px', maxHeight: '100px' }} alt={product.image}
                                        onError={(e) => {
                                            console.error('Error loading image:', e);
                                        }}
                                    />
                                    <div className="container justify-content-between ">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">${product.price}</p>
                                        <p className="card-text">{product.description}</p>
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
