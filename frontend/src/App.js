import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import AddProduct from './screens/farmer/AddProduct'
import ProductList from './screens/farmer/ProductList'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/farmer" component={ProductList} />
      <Route path="/product" component={AddProduct} />
    </BrowserRouter>
  );
}

export default App;
