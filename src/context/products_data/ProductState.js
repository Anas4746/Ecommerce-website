import React, { useState } from "react";
import productContext from './productContext'

export default function Products(props) {

    const host = "http://localhost:5000"
    const AllProducts = []
    const shopProducts = []
    const [products, setProducts] = useState(AllProducts)
    const [shopProduct, setshopProduct] = useState(shopProducts)

    //Get Products
    const getProduct = async () => {

        const response = await fetch(`${host}/product`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const json = await response.json();
        // console.log(json)
        setProducts(json)
    }

    //Get farmProducts
    const getShopProducts = async (shop_id) => {
        const response = await fetch(`${host}/farms/${shop_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const json = await response.json();
        setshopProduct(json)
        getProduct()
    }

    //Add Product
    const addProduct = async (shop_id, name, price, image, description) => {

        console.log(shop_id, name, price, image, description)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image); // Assuming imageFile is a File object
        formData.append('description', description);
        const response = await fetch(`${host}/farms/${shop_id}/product`, {
            method: 'POST',
            headers: {

            },
            body: formData
        })
        const data = await response.json();
        console.log(data)
        if (data) {
            getShopProducts(shop_id)
            alert('Product Added')
        } else {
            alert('Product not Added')
        }
    }

    // Update Product
    const UpdateProdut = async (product_id, product, productImg) => {
        console.log(product_id, product.Updatename, product.Updateprice, product.Updateimage, product.Updatedescription, productImg)
        const formData = new FormData();
        formData.append('name', product.Updatename)
        formData.append('price', product.Updateprice)
        formData.append('description', product.Updatedescription)
        formData.append('image', productImg ? productImg : product.Updateimage)
        const response = await fetch(`${host}/product/${product_id}`, {
            method: 'PUT',
            headers: {

            },
            body: formData
        })

        const data = await response.json();
        console.log(data)
        if (data) {
            window.alert('Product successfully Updated')
        } else {
            window.alert('Product Not Update')
        }
    }

    //Delete Product
    const deleteProduct = async (id) => {

        const response = await fetch(`${host}/product/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        //console.log(data)
        if (!data) {
            window.alert('Product not deleted')
        } else {
            window.alert('Product successfully deleted')
        }
        setProducts(data)
    }

    return (
        <div>
            <productContext.Provider value={{ products, getProduct, shopProduct, getShopProducts, addProduct, UpdateProdut, deleteProduct }}>
                {props.children}
            </productContext.Provider>
        </div>
    )
}
