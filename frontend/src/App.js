import Landing from './screens/landing/Landing'

import Home from './screens/customer/Home'
import Orders from './screens/customer/Orders';
import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import AddProduct from './screens/farmer/AddProduct'
import ProductList from './screens/farmer/ProductList'
import FarmerHome from './screens/farmer/FarmerHome'
import FarmerSignin from './screens/farmer/FarmerSignin'
import FarmerPage from './screens/farmer/Farmer'
import LandingCustomer from './screens/customer/LandingCustomer.js'
import Cart from './screens/customer/Cart.js'
import CartCheckout from './screens/customer/CartCheckout.js'
import CustomerDetails from './screens/customer/CustomerDetails.js'
import { Router, Link } from 'react-router-dom';
// import Signin from './screens/farmer/Signin.js'
import Account from './screens/customer/Account.js'
import Signin from './screens/customer/Signin.js';
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
      <Route path="/product" exact component={ProductList} />
      <Route path="/product/add" exact component={AddProduct} />
      <Route path="/farmer-home" exact component={FarmerHome} />
      <Route path="/farmer-signin" exact component={FarmerSignin} />
      <Route path="/farmer" exact component={FarmerPage} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/orders/view" exact component={ViewOrderDetails} />
      <Route path="/" exact component={Home} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/signin" exact component={Signin} />
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
