import React, { useContext, useEffect, useState } from 'react'
import shopContext from '../context/shops/shopContext'
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateShop() {
    const { userShops, UpdateShop } = useContext(shopContext);
    const navigate = useNavigate()

    const { id } = useParams();

    const [shop, setShop] = useState({ _id: id, Updatename: '', Updateaddress: '', Updateimage: '', Updateemail: '' })
    const [shopImg, setShopImg] = useState()
    useEffect(() => {

        for (let currentShop of userShops) {
            if (currentShop._id === id) {
                setShop({ _id: id, Updatename: currentShop.name, Updateaddress: currentShop.address, Updateimage: currentShop.image, Updateemail: currentShop.email })
            }
        }
        // eslint-disable-next-line
    }, [])

    const Update = () => {

        console.log('Updating the shop....', shop)
        UpdateShop(id, shop, shopImg)
        navigate('/userShop')
        // eslint-disable-next-line
    }

    const onChange = (e) => {
        setShop({ ...shop, [e.target.name]: e.target.value })
        if (!e.target.Updateimage) {
            e.target.Updateimage = shop.Updateimage
        }
        if (e.target.files) {
            // console.log(e.target.files[0])
            setShopImg(e.target.files[0])
        }
    }
    // console.log(shop)
    return (
        <div className='container my-3'>
            <div className="mb-3">

                <label htmlFor="shopName" className="form-label">Shop Name</label>
                <input type="text" className="form-control" id="shopName" name='Updatename' value={shop.Updatename} onChange={onChange} />

                <label htmlFor="shopAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="shopAddress" name='Updateaddress' value={shop.Updateaddress} onChange={onChange} />
                {/* value={shop.Updateimage} */}
                <label htmlFor="shopImg" className="form-label">Shop Image</label>
                <input className="form-control" type="file" id="shopImg" name='Updateimage' onChange={onChange} />

                <label htmlFor="ownerEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="ownerEmail" name='Updateemail' value={shop.Updateemail} onChange={onChange} />

                <button onClick={Update} type="button" className="btn btn-success" >Update Shop</button>

            </div>

        </div>
    )
}
