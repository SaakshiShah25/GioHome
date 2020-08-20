import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/farmer/Navbar.component'
import AddProduct from './components/farmer/AddProduct.component'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/farmer" exact component={AddProduct} />
    </BrowserRouter>
  );
}

export default App;
