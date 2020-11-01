import React, { Component } from 'react';
import 'whatwg-fetch';
import axios from 'axios'
import { Link } from 'react-router-dom';
//http://localhost:5000/api/signup
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class FarmerAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      userType: ''
      
    };


    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');

  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('http://localhost:5000/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        })
        .then(setInStorage("type",""))
        .then(window.location.reload())
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  
  // Selecting if he is a farmer or a Customer
  // and the value is set in the internal storage 
  // as the key -> "type"
  selectType(event) {
    this.setState({
      userType: event.target.value
    });
  }

  render() {
    return (
      <div>
        <p>My Farmer's Account</p>

        <button onClick={this.logout}><Link to="/signin">Logout</Link></button>
      </div>
    );
  }
}

export default FarmerAccount;