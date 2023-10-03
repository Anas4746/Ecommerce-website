import React, { useState } from 'react'
import CartProductContext from './CartProductContext'


export default function CartProductState(props) {
    const host = "http://localhost:5000"
    const cartProductVal = []
    const [cartProducts, setCartProducts] = useState(cartProductVal)

    // Get cartProducts
    const CartProduct = async () => {
        const response = await fetch(`${host}/cartProduct`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const data = await response.json()
        // console.log(data)
        // console.log(data.cartProduct.filter((product) => { return product }))
        setCartProducts(data)
    }
    // console.log(cartProducts)

    // Add cartProduct
    const AddCartProduct = async (product_id) => {
        const response = await fetch(`${host}/cartProduct`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                cartProduct: product_id
            })
        })
        const data = await response.json()
        // console.log(data)
        // console.log(data.cartProduct.filter((product) => { return product }))
        if (data) {
            if (data.CartPosition) {
                alert(data.CartPosition)
            } else {
                alert('Product Added in your cart.')
            }
        } else {
            alert('Product not Added')
        }
        setCartProducts(data)
    }

    // Remove cartProduct
    const RemoveCartProduct = async (product_id) => {
        const response = await fetch(`${host}/cartProduct/${product_id}`, {
            method: "Delete",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const data = response.json()
        // console.log(data)
        if (data) {
            alert('Product Removed')
        } else {
            alert('Product not Removed')
        }
    }

    return (
        <CartProductContext.Provider value={{ CartProduct, cartProducts, AddCartProduct, RemoveCartProduct }}>
            {props.children}
        </CartProductContext.Provider>
    )
}
