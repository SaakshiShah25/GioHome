import React, { Component } from 'react';
import 'whatwg-fetch';
import axios from 'axios'
import { Link } from 'react-router-dom';
//http://localhost:5000/api/signup
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class FarmerSignin extends Component {
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

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
   

    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);

    this.selectType = this.selectType.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');

    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('http://localhost:5000/api/account/farmerverify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
     
    } = this.state;

    this.setState({
      isLoading: true,
    });
    setInStorage("email",signInEmail)
    setInStorage("type",this.state.userType)
    
    // Post request to backend
    fetch('http://localhost:5000/api/account/farmersignin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
          this.props.history.push('/customer')
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      })
      .then(window.location.reload())
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('http://localhost:5000/api/account/farmerlogout?token=' + token)
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
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      userType
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
                  <div className="radio" onChange={this.selectType}>
              
                  <input
                    type="radio"
                    value="Farmer"
                    checked={this.state.userType === "Farmer"}
                    name="userType"
                  
                  />
                    Farmer
                  <input
                    type="radio"
                    value="Customer"
                    checked={this.state.userType === "Customer"}
                    name="userType"
                  
                  />
                    Customer
       
                  </div>
    
            <button onClick={this.onSignIn}>
             <Link to="/">
             Sign In
             </Link>
              
              </button>
            <button>
                <Link to="/">Signup</Link>
            </button>
          <div>{this.state.userType}</div>
          </div>
          <br />
          <br />
        </div>

       
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default FarmerSignin;