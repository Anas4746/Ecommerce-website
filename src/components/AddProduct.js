
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import productContext from '../context/products_data/productContext'
import { useNavigate } from 'react-router-dom'


export default function AddProduct() {
    const { addProduct } = useContext(productContext)
    const { shop_id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({ name: '', price: 0, description: '' })
    const [productImg, setProductImg] = useState()
    const onSubmit = async (e) => {
        e.preventDefault()
        addProduct(shop_id, product.name, parseInt(product.price), productImg, product.description)
        navigate(`/userShop/shopProducts/${shop_id}`)
        // eslint-disable-next-line
    }

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        if (e.target.files) {
            setProductImg(e.target.files[0])
        }
    }
    return (
        <div className="container my-3">
            <div className="container text-center"><h1><b>Add Your Product</b></h1></div>
            <div className='container my-3'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input className="form-control" id='name' type="text" name="name" onChange={onChange} placeholder="Product name" required />

                    <label htmlFor="price" className="form-label">Price</label>
                    <input className="form-control" id='price' type="number" min={0} name="price" onChange={onChange} placeholder="Product price" required />

                    <label htmlFor="product_image" className="form-label">Upload image</label>
                    <input className="form-control" id='product_image' type="file" name="product_image" onChange={onChange} required />

                    <label htmlFor="description" className="form-label">Description</label>
                    <input className="form-control" id='description' type="text" name="description" onChange={onChange} placeholder="description" required />

                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

            </div>
            <div className="back-links">
                {/* <Link className="btn btn-warning " to={`/shopProducts/${shop._id}`} role="button">View Products</Link> */}
                <Link className="btn btn-danger mx-2" to="/userShop" role="button">View Shops</Link>
            </div>
        </div>
    )
}
