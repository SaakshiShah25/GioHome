import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import AddProduct from './screens/farmer/AddProduct'
import ProductList from './screens/farmer/ProductList'
import FarmerPage from './screens/farmer/Farmer'
import LandingCustomer from './screens/customer/LandingCustomer.js'
import Cart from './screens/customer/Cart.js'
import { Router, Link } from 'react-router-dom';

import history from './history.js';
function App({history}) {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/product" exact component={ProductList} />
      <Route path="/product/add" exact component={AddProduct} />
      <Route path="/farmer" exact component={FarmerPage} />
      <Route path="/customer" exact component={LandingCustomer} />
      <Route path="/cart" exact component={Cart} />

    </BrowserRouter>
  );
}

export default App;
