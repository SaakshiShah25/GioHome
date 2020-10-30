import Home from './screens/customer/Home'
import Orders from './screens/customer/Orders';
import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import AddProduct from './screens/farmer/AddProduct'
import ProductList from './screens/farmer/ProductList'
import FarmerPage from './screens/farmer/Farmer'
import LandingCustomer from './screens/customer/LandingCustomer.js'
import Cart from './screens/customer/Cart.js'
import CartCheckout from './screens/customer/CartCheckout.js'
import CustomerDetails from './screens/customer/CustomerDetails.js'
import { Router, Link } from 'react-router-dom';
import Signin from './screens/customer/Signin.js';
import ViewOrderDetails from './screens/customer/ViewOrderDetails'

import history from './history.js';
function App({history}) {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/product" exact component={ProductList} />
      <Route path="/product/add" exact component={AddProduct} />
      <Route path="/farmer" exact component={FarmerPage} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/orders/view" exact component={ViewOrderDetails} />
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/customer" exact component={LandingCustomer} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/cart/checkout" exact component={CartCheckout} />
      <Route path="/cart/checkout/details" exact component={CustomerDetails} />

    </BrowserRouter>
  );
}

export default App;
