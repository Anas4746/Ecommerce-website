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
        // eslint-disable-next-line
        // console.log(data.cartProduct.filter((product) => { return product }))
        setCartProducts(data.cartProduct)

    }
    // console.log(cartProducts)

    // Add cartProduct
    const AddCartProduct = async (product_id) => {
        // console.log(product_id)
        const response = await fetch(`${host}/cartProduct`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                cartProduct: product_id, quantity: 1
            })
        })
        const data = await response.json()
        // console.log(data.cartProduct)
        console.log(data)
        // console.log(data.cartProduct.filter((product) => { return product }))
        if (data) {
            if (data.CartPosition) {
                alert(data.CartPosition)
            } else if (data.cartProduct) {
                setCartProducts(data.cartProduct)
                CartProduct();
                alert('Product Added in your cart.')
            }
        } else {
            alert('Product not Added')
        }
    }

    // Add Quantity
    const AddQuantity = async (product_id) => {
        // console.log(product_id)
        const response = await fetch(`${host}/addQuantity`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                cartProduct: product_id
            })
        })
        await response.json()
        CartProduct();
        // console.log(data.cartProduct)
        // console.log(data.cartProduct.filter((product) => { return product }))
        // if (data) {
        //     if (data.CartPosition) {
        //         alert(data.CartPosition)
        //     } else if (data.cartProduct) {
        //         setCartProducts(data.cartProduct)
        //         alert('Product Added in your cart.')
        //     }
        // } else {
        //     alert('Product not Added')
        // }
    }

    // Remove Quantity
    const RemoveQuantity = async (product_id) => {
        // console.log(product_id)
        const response = await fetch(`${host}/removeQuantity`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                cartProduct: product_id
            })
        })
        await response.json()
        CartProduct();
        // console.log(data.cartProduct)
        // console.log(data.cartProduct.filter((product) => { return product }))
        // if (data) {
        //     if (data.CartPosition) {
        //         alert(data.CartPosition)
        //     } else if (data.cartProduct) {
        //         setCartProducts(data.cartProduct)
        //         alert('Product remove in your cart.')
        //     }
        // } else {
        //     alert('Product not Added')
        // }
    }

    // Remove cartProduct
    const RemoveCartProduct = async (product_id) => {
        // console.log(product_id)
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
            CartProduct();
        } else {
            alert('Product not Removed')
        }
    }

    return (
        <CartProductContext.Provider value={{ CartProduct, cartProducts, AddCartProduct, RemoveCartProduct, AddQuantity, RemoveQuantity }}>
            {props.children}
        </CartProductContext.Provider>
    )
}
