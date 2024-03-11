
import React, { useContext, useEffect, useState } from 'react'
import CartProductContext from '../context/cartProduct/CartProductContext'
// import { useSelector, useDispatch } from 'react-redux'
// import { actionCreators } from '../states/index'
// import { bindActionCreators } from 'redux'



export default function CartProduct() {
  const { CartProduct, cartProducts, RemoveCartProduct, AddQuantity, RemoveQuantity } = useContext(CartProductContext)
  // const count = useSelector((state) => state.ItemReducer)
  // const price = useSelector((state) => state.PriceReducer)
  const [totalPrice, setTotalPrice] = useState(0)
  // const dispatch = useDispatch()
  let totalProduct = 0
  useEffect(() => {
    CartProduct()
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    const calculateTotal = cartProducts.reduce((totalPrice, Product) => totalPrice + Product.price, 0)
    // eslint-disable-next-line 
    setTotalPrice(calculateTotal)
  }, [cartProducts])

  if (!Array.isArray(cartProducts)) {
    return <div>No cart products available.</div>;
  }
  // const { AddItem, RemoveItem } = bindActionCreators(actionCreators, dispatch)

  return (
    <>
      <div className="cart_container container">
        <div className="container text-center"><h1>Cart Products</h1></div>
        <div className='cart_data container'>
          <table className="table table-hover my-4">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Products</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((Product) => (
                <tr key={Product.product._id}>
                  <th scope="row">{totalProduct = totalProduct + 1}.</th>
                  <td>
                    <div>
                      <img src={`./images/${Product.product.image}`} style={{ minWidth: '30px', maxWidth: '30px', minHeight: '30px', maxHeight: '30px' }} alt={Product.product.image} /> {Product.product.name}</div></td>
                  <td>{Product.price}</td>
                  <td className='cart_quantity'>
                    <button className='btn btn-warning me-1 px-2 py-0' style={{ fontSize: '15px' }} onClick={() => { RemoveQuantity(Product.product._id) }} disabled={Product.price === Product.product.price}>-</button> {/*  */}
                    <span style={{ fontSize: '25px' }}>{Product.quantity}</span>
                    <button className='btn btn-warning ms-1 px-2 py-0' style={{ fontSize: '15px' }} onClick={() => { AddQuantity(Product.product._id) }}>+</button>

                  </td>
                  <td>
                    <button className='cart_product_remove_button btn btn-danger btn-sm .text-nowrap' onClick={() => { RemoveCartProduct(Product.product._id) }}>Remove Product</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                </td>
                <td>
                  <b><span>Total: </span></b>
                </td>
                <td style={{ color: 'blue' }}>
                  <b>{totalPrice}:</b>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </>
  )
}
