
import React, { useContext, useState, useEffect } from 'react'
import productContext from '../context/products_data/productContext'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {

    const { products, UpdateProdut } = useContext(productContext)
    const { id } = useParams();
    const navigate = useNavigate()

    const [product, setProduct] = useState({ _id: id, Updatename: '', Updateprice: '', Updateimage: '', Updatedescription: '', farm: '' })
    const [productImg, setProductImg] = useState()

    useEffect(() => {
        for (let currentProduct of products) {
            if (currentProduct._id === id) {
                setProduct({ Updatename: currentProduct.name, Updateprice: currentProduct.price, Updateimage: currentProduct.image, Updatedescription: currentProduct.description, farm: currentProduct.farm })
                // console.log(currentProduct)
            }
        }
        // eslint-disable-next-line
    }, [])

    const Update = () => {
        console.log('Updating the product....', product, productImg)
        UpdateProdut(id, product, productImg)
        navigate(`/userShop/shopProducts/${product.farm}`)
    }

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        if (!e.target.Updateimage) {
            e.target.Updateimage = product.Updateimage
        }
        if (e.target.files) {
            // console.log(e.target.files[0])
            setProductImg(e.target.files[0])
        }

    }

    return (
        <div className='container my-3'>
            <div className="mb-3">
                <form onSubmit={Update}>
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="productName" name='Updatename' value={product.Updatename} onChange={onChange} />

                    <label htmlFor="productPrice" className="form-label">Price</label>
                    <input type="number" min={0} className="form-control" id="productPrice" name='Updateprice' value={product.Updateprice} onChange={onChange} />

                    <label htmlFor="productImg" className="form-label">Product Image</label>
                    <input className="form-control" type="file" id="productImg" name='Updateimage' onChange={onChange} />

                    <label htmlFor="productDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="productDescription" name='Updatedescription' value={product.Updatedescription} onChange={onChange} />

                    <NavLink className="btn btn-warning my-3 " to={`/userShop/shopProducts/${product.farm}`}>Go back to Farm</NavLink>

                    <button type="submit" className="btn btn-success mx-3" >Update Product</button>

                </form>
            </div>

        </div>
    )
}
