import Landing from './screens/landing/Landing'

import CustomerSignup from './screens/customer/CustomerSignup'
import Orders from './screens/customer/Orders';
import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import AddProduct from './screens/farmer/AddProduct'
import ProductList from './screens/farmer/ProductList'
import FarmerSignup from './screens/farmer/FarmerSignup'
import FarmerSignin from './screens/farmer/FarmerSignin'
import FarmerPage from './screens/farmer/Farmer'
import LandingCustomer from './screens/customer/LandingCustomer.js'
import Cart from './screens/customer/Cart.js'
import CartCheckout from './screens/customer/CartCheckout.js'
import CustomerDetails from './screens/customer/CustomerDetails.js'
import { Router, Link } from 'react-router-dom';
// import Signin from './screens/farmer/Signin.js'
import Account from './screens/customer/Account.js'
import CustomerSignin from './screens/customer/CustomerSignin.js';
import ViewOrderDetails from './screens/customer/ViewOrderDetails'
import ProductsOffered from './screens/customer/ProductsOffered'
import MoreDetails from './screens/customer/MoreDetails'
import FarmerAccount from './screens/farmer/FarmerAccount'
import FarmerOrders from './screens/farmer/FarmerOrders'


import history from './history.js';
function App({history}) {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Landing} />
      {/* Authentication for Farmer and Customer */}
      <Route path="/farmer-signup" exact component={FarmerSignup} />
      <Route path="/farmer-signin" exact component={FarmerSignin} />
      <Route path="/customer-signup" exact component={CustomerSignup} />
      <Route path="/customer-signin" exact component={CustomerSignin} />
      {/* ********************************************* */}
      <Route path="/product" exact component={ProductList} />
      <Route path="/product/add" exact component={AddProduct} />
      <Route path="/farmer" exact component={FarmerPage} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/orders/view" exact component={ViewOrderDetails} />
      <Route path="/customer" exact component={LandingCustomer} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/cart/checkout" exact component={CartCheckout} />
      <Route path="/cart/checkout/details" exact component={CustomerDetails} />
      <Route path="/account" exact component={Account} />
      <Route path="/customer/products-offered" exact component={ProductsOffered} />
      <Route path="/customer/products-offered/moredetails" exact component={MoreDetails} />
      <Route path="/farmer-account" exact component={FarmerAccount} />
      {/* <Route path="/farmer-orders" exact component={FarmerOrders} /> */}

      


    </BrowserRouter>
  );
}

export default App;
