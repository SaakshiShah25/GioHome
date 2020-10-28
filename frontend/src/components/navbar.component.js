import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Sidebar from './sidebar.component'

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Sidebar />
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
              <Link to="/user" className="nav-link">Customer</Link>
              </li>
            </ul>
            <ul className="navbar-nav navbar-right">
            <li className="navbar-item">
                <Link to="/orders" className="nav-link">Orders</Link>
              </li>
            </ul>
            </div>
          </nav>
     
        );
    }
}

