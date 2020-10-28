import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import Sidebar from './components/sidebar.component'
import './Sidebar.css'
import AddProduct from './screens/farmer/AddProduct'
import ProductList from './screens/farmer/ProductList'
import FarmerPage from './screens/farmer/Farmer'
import Home from './screens/farmer/Home'
import { Router, Link } from 'react-router-dom';
import history from './history.js';
import Orders from './screens/farmer/Orders';
function App({history}) {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/product" exact component={ProductList} />
      <Route path="/product/add" exact component={AddProduct} />
      <Route path="/farmer" exact component={FarmerPage} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/" exact component={Home} />
    </BrowserRouter>
  );
}

export default App;
