import React, { useState } from 'react'
import ShopContext from './shopContext'

export default function Shopstate(props) {
    const host = "http://localhost:5000"
    const shopsdata = []
    const userShopData = []
    const [shops, setShops] = useState(shopsdata)
    const [userShops, setUserShops] = useState(userShopData)


    //Get Shop
    const getShop = async () => {

        const response = await fetch(`${host}/farms`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const json = await response.json();
        //console.log(json)
        setShops(json)
    }

    //Add Shop
    const addShop = async (name, address, image, email) => {
        console.log(name, address, image, email)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('image', image); // Assuming imageFile is a File object
        formData.append('email', email);

        const response = await fetch(`${host}/farms`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token')
            },
            body: formData,
        })

        const data = await response.json()
        console.log(data)
        if (data) {
            // window.alert('Shop added')
        } else {
            window.alert('Shop not add')
        }

        //setShops(shops.concat(data))
    }

    //Edit Shop
    const UpdateShop = async (id, shop, shopImg) => {
        console.log(shopImg ? shopImg : shop.Updateimage)
        const formData = new FormData();
        formData.append('name', shop.Updatename)
        formData.append('address', shop.Updateaddress)
        formData.append('image', shopImg ? shopImg : shop.Updateimage)
        formData.append('email', shop.Updateemail)
        const response = await fetch(`${host}/farms/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token')
            },
            body: formData
        })
        const data = await response.json()
        //console.log(data)
        if (data) {
            console.log(data)
            window.alert('Shop successfully Updated')
        } else {
            window.alert('Shop Not Update')
        }


        // for (let index = 0; index < shops.length; index++) {
        //     const element = shops[index];
        //     if (element._id === id) {
        //         element.name = shop.Updatename
        //         element.address = shop.Updateaddress
        //         element.image = shop.Updateimage
        //         element.email = shop.Updateemail
        //     }
        // }

    }

    //Delete Shop
    const deleteShop = async (id) => {

        const response = await fetch(`${host}/farms/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })

        const data = await response.json()
        console.log(data)
        if (!data) {
            window.alert('Shop not deleted')
        } else {
            window.alert('Shop successfully deleted')
        }
        setShops(data)
    }

    // User Shop
    const userShop = async () => {
        const response = await fetch(`${host}/userShop`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        // console.log(json)
        setUserShops(json)
    }
    return (
        <div>
            <ShopContext.Provider value={{ shops, setShops, addShop, UpdateShop, deleteShop, getShop, userShop, userShops }}>
                {props.children}
            </ShopContext.Provider>
        </div>
    )
}
