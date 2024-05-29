import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Shopstate from './context/shops/Shopstate';
import Products from './context/products_data/ProductState';
import Shops from './components/Shop'
import AddShop from './components/AddShop';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import UpdateShop from './components/UpdateShop';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import UserShop from './components/UserShop';
import ShopProducts from './components/ShopProducts';
import AddProduct from './components/AddProduct';
import UserShopProducts from './components/UserShopProducts';
import UpdateProduct from './components/UpdateProduct';
import UserState from './context/Users/userState';
import CartProductState from './context/cartProduct/CartProductState';
import CartProduct from './components/CartProduct';

function App() {
  return (
    <>
      <UserState>
        <Products>
          <Shopstate>
            <CartProductState>
              <Router>
                <Navbar />
                <Routes>
                  <Route exact path='/' element={<Home />}></Route>

                  <Route exact path='/shops' element={<Shops />}></Route>

                  <Route exact path='/about' element={<About />}></Route>

                  <Route exact path='/addShop' element={<AddShop />}></Route>

                  <Route exact path='/updateShop/:id' element={<UpdateShop />}></Route>

                  <Route exact path='/login' element={<UserLogin />}></Route>

                  <Route exact path='/signup' element={<UserSignup />}></Route>

                  <Route exact path='/userShop' element={<UserShop />}></Route>

                  <Route exact path='/shopProducts/:shop_id' element={<ShopProducts />}></Route>

                  <Route exact path='/addProduct/:shop_id' element={<AddProduct />}></Route>

                  <Route exact path='/userShop/shopProducts/:shop_id' element={<UserShopProducts />}></Route>

                  <Route exact path='/product/:id' element={<UpdateProduct />}></Route>

                  <Route exact path='/userCart' element={<CartProduct />}></Route>

                </Routes>

              </Router>

            </CartProductState>
          </Shopstate>
        </Products>
      </UserState>
    </>
  );
}

export default App;
