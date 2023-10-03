import React from 'react'

import Product from './Product'

export default function Home() {
    //const shops = useContext(shopContext)

    return (
        <div className="container my-3">
            <h1>Products</h1>
            {/* <div className="container" >
                {shops.map((shop) => {
                    return <h3>{shop.name}</h3>
                })}
            </div> */}
            <Product />
        </div>
    )
}
