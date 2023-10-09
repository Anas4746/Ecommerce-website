import React, { useContext } from 'react'
import productContext from '../context/products_data/productContext'
import Productitem from './Productitem'

export default function Product() {
  const { products } = useContext(productContext)

  return (
    <div>

      <div className="row my-3">

        {products.map((product) => {
          return <Productitem key={product._id} product={product} />
        })}

      </div>

    </div>
  )
}

