
import React, { useContext, useEffect } from 'react'
import CartProductContext from '../context/cartProduct/CartProductContext'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../states/index'
import { bindActionCreators } from 'redux'

export default function CartProduct() {
  const { CartProduct, cartProducts, RemoveCartProduct } = useContext(CartProductContext)
  const count = useSelector((state) => state.ItemReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      CartProduct()
    }
    // eslint-disable-next-line 
  }, [])
  if (!Array.isArray(cartProducts.cartProduct)) {
    return <div>No cart products available.</div>;
  }
  const { AddItem, RemoveItem } = bindActionCreators(actionCreators, dispatch)

  return (
    <div className="container my-4">
      <div className="container text-center"><h1>Cart Products</h1></div>

      <table className="table table-hover my-4">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Products</th>
            <th scope="col">Product Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>

        {cartProducts.cartProduct.map((product) => (
          <tbody key={product._id}>
            <tr>
              <th scope="row">1</th>
              <td>
                <div>
                  <img src={`./images/${product.image}`} style={{ minWidth: '30px', maxWidth: '30px', minHeight: '30px', maxHeight: '30px' }} alt={product.image} />{product.name}</div></td>
              <td>{product.price}</td>
              <td>
                <div>
                  <button onClick={RemoveItem}>-</button>
                  <span style={{ fontSize: '25px' }}>{count}</span>
                  <button onClick={AddItem}>+</button>
                </div>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => { RemoveCartProduct(product._id) }}>Remove Product</button>
              </td>
            </tr>
          </tbody>

        ))}
      </table>
    </div>
  )
}
