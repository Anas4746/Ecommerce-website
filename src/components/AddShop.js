import React, { useContext, useState } from 'react';
import shopContext from '../context/shops/shopContext';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function AddShop() {
    const { addShop } = useContext(shopContext);
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [shopImg, setShopImg] = useState("")


    const onSubmit = (data) => {
        console.log(data)
        addShop(data.name, data.address, shopImg, data.email);
        navigate('/userShop');
    };

    // console.log(shopImg)

    return (
        <div className="container my-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="shopName" className="form-label">
                        Shop Name
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="form-control"
                                id="shopName"
                                placeholder=""
                                required
                            />
                        )}
                    />

                    <label htmlFor="shopAddress" className="form-label">
                        Address
                    </label>
                    <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="form-control"
                                id="shopAddress"
                                placeholder=""
                                required
                            />
                        )}
                    />

                    <label htmlFor="shopImg" className="form-label">
                        Shop Image
                    </label>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="file"
                                className="form-control"
                                id="shopImg"
                                onChange={(e) => { console.log(setShopImg(e.target.files[0])) }}
                                required
                            />
                        )}
                    />

                    <label htmlFor="ownerEmail" className="form-label">
                        Email address
                    </label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                className="form-control"
                                id="ownerEmail"
                                placeholder=""
                                required
                            />
                        )}
                    />

                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}





// import React, { useContext, useEffect, useState } from 'react'
// import shopContext from '../context/shops/shopContext'
// import { useNavigate } from 'react-router-dom'

// export default function AddShop() {
//     const { addShop } = useContext(shopContext);
//     const navigate = useNavigate()

//     const [shop, setShop] = useState({ name: '', address: '', email: '' })
//     const [shopImg, setShopImg] = useState()

//     const AddShop = (e) => {
//         e.preventDefault()
//         addShop(shop.name, shop.address, shopImg, shop.email)
//         navigate('/userShop')
//     }

//     const onChange = (e) => {
//         setShop({ ...shop, [e.target.name]: e.target.value })
//         if (e.target.files) {
//             // console.log(e.target.files[0])
//             setShopImg(e.target.files[0])
//         }
//     }

//     console.log(shopImg)

//     useEffect(() => {
//         if (!localStorage.getItem('token')) {
//             navigate('/login')
//         }
//     })

//     return (

//         <div className='container my-3'>
//             <div className="mb-3">

//                 <label htmlFor="shopName" className="form-label">Shop Name</label>
//                 <input type="text" className="form-control" id="shopName" name='name' placeholder="" onChange={onChange} />

//                 <label htmlFor="shopAddress" className="form-label">Address</label>
//                 <input type="text" className="form-control" id="shopAddress" name='address' placeholder="" onChange={onChange} />

//                 <label htmlFor="shopImg" className="form-label">Shop Image</label>
//                 <input className="form-control" type="file" id="shopImg" name='image' onChange={onChange} />

//                 <label htmlFor="ownerEmail" className="form-label">Email address</label>
//                 <input type="email" className="form-control" id="ownerEmail" name='email' placeholder="" onChange={onChange} />

//                 <button type="button" className="btn btn-success" onClick={AddShop}>Submit</button>

//             </div>

//         </div>
//     )
// }
