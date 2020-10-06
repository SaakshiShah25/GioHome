import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Gio Home Products</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              <Link to="/farmer" className="nav-link">Farmer</Link>
              </li>
              <li className="navbar-item">
              <Link to="/product" className="nav-link">Stock</Link>
              </li>
              <li className="navbar-item">
              <Link to="/customer" className="nav-link">Customer</Link>
              </li>
              <li className="navbar-item">
              <Link to="/cart" className="nav-link">Cart</Link>
              </li>
              
            </ul>
            </div>
          </nav>
     
        );
    }
}

