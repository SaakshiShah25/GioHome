import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Sidebar from './sidebar.component'

import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';

export default class Navbar extends Component{

  constructor(props){
    super(props);


    this.state={
        userType : ""
    }
}

  componentDidMount()
  {

    const userType = getFromStorage("type")
   
    console.log("Check",userType)

    this.setState(
      {
        userType : userType
      }
    )
  }

    render(){

      if(this.state.userType == "Farmer")
      {
        return(
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Sidebar />
          <Link to="/farmer" className="navbar-brand">Gio Home Products</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          
            
            <li className="navbar-item">
            <Link to="/farmer" className="nav-link">Farmer</Link>
            </li>
            <li className="navbar-item">
            <Link to="/product" className="nav-link">Stock</Link>
            </li>
            <li className="navbar-item">
            <Link to="/farmer-account" className="nav-link">Account</Link>
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
      else if (this.state.userType == "Customer")
      {
        return(
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Sidebar />
          <Link to="/customer" className="navbar-brand">Gio Home Products</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/customer" className="nav-link">Customer</Link>
            </li>
            <li className="navbar-item">
            <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            <li className="navbar-item">
            <Link to="/account" className="nav-link">Account</Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="navbar-item">
                <Link to="/orders" className="nav-link">Orders</Link>
            </li>
          </ul>
          </div>
        </nav>
   
        )
      }
      else {
        return(
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Sidebar />
            <Link to="/" className="navbar-brand">Gio Home Products</Link>
          </nav>
        )
        
      }
      
    }
        
   
}

