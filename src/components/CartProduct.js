
import React, { useContext, useEffect } from 'react'
import CartProductContext from '../context/cartProduct/CartProductContext'
// import { useSelector, useDispatch } from 'react-redux'
// import { actionCreators } from '../states/index'
// import { bindActionCreators } from 'redux'

export default function CartProduct() {
  const { CartProduct, cartProducts, RemoveCartProduct } = useContext(CartProductContext)
  // const count = useSelector((state) => state.ItemReducer)
  // const [removeItem, setRemoveItem] = useState(false)
  // const dispatch = useDispatch()

  useEffect(() => {
    CartProduct()
    // eslint-disable-next-line 
  }, [cartProducts])

  if (!Array.isArray(cartProducts)) {
    return <div>No cart products available.</div>;
  }
  // const { AddItem, RemoveItem } = bindActionCreators(actionCreators, dispatch)

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

        {cartProducts.map((Product) => (
          <tbody key={Product.product._id}>
            <tr>
              <th scope="row">1</th>
              <td>
                <div>
                  <img src={`./images/${Product.product.image}`} style={{ minWidth: '30px', maxWidth: '30px', minHeight: '30px', maxHeight: '30px' }} alt={Product.product.image} />{Product.product.name}</div></td>
              <td>{Product.product.price}</td>
              <td>
                <div>
                  <button >-</button>
                  <span style={{ fontSize: '25px' }}>{Product.quantity}</span>
                  <button >+</button>
                </div>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => { RemoveCartProduct(Product.product._id) }}>Remove Product</button>
              </td>
            </tr>
          </tbody>

        ))}
      </table>
    </div>
  )
}
