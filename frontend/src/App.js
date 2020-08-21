import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/farmer/Navbar.component'
import AddProduct from './components/farmer/AddProduct.component'
import ProductList from './components/farmer/ProductList.component'
import { Router, Link } from 'react-router-dom';
import history from './history.js';
function App({history}) {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/product" exact component={ProductList} />
      <Route path="/product/add" exact component={AddProduct} />
    </BrowserRouter>
  );
}

export default App;
