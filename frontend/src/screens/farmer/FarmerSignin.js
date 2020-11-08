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
      isLoading: false,
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
      console.log(token)
      fetch('http://localhost:5000/farmer-signup/api/account/farmerverify?token=' + token)
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
    // window.location.reload()
    // Grab state
    const {
      signInEmail,
      signInPassword,
     
    } = this.state;

    this.setState({
      isLoading: true,
    });
    setInStorage("email",signInEmail)
    const s = getFromStorage("email")
    console.log("rehvade",s)
  
    
    // Post request to backend
    fetch('http://localhost:5000/farmer-signup/api/account/farmersignin', {
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
          this.props.history.push('/farmer')
          window.location.reload()
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
      fetch('http://localhost:5000/farmer-signup/api/account/farmerlogout?token=' + token)
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
            <h1 style={{textAlign:'center'}}>Sign In</h1>
            <input style={{marginLeft:'25%' ,width: '50%',paddingLeft:"10px",borderRadius:"10px"}}
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input style={{marginLeft:'25%' ,width: '50%',paddingLeft:"10px",borderRadius:"10px"}}
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
                  {/* <div className="radio" onChange={this.selectType}>
              
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
       
                  </div> */}

                  
    
            <div className="row" style={{display:"flex", justifyContent:"center",paddingLeft:"10px",borderRadius:"10px"}}>
            <div style={{justifyContent:'space-around'}}>
            <button className='card_button-green' onClick={this.onSignIn}>
             <Link style={{color:'whitesmoke',textDecoration:'none'}} to="/farmer">
             Sign In
             </Link>
              
              </button>
              <h5 style={{textAlign:"center"}}>New to us? Join us </h5>
            <div>
            <button className='card_button-red' >
                <Link style={{color:'whitesmoke',textDecoration:'none'}} to="/farmer-signup">Signup</Link>
            </button>
            </div>
            </div></div>
          <div>{this.state.userType}</div>
          </div>
          <br />
          <br />
        </div>

       
      );
    }

    return (
     
      <div>
        <h3 style={{marginTop:'20px',textAlign:'center'}}>Account</h3>
        <div style={{display:'flex',justifyContent:'center'}}>
        <button className="card_button-red" onClick={this.logout}>

          <Link style={{color:'whitesmoke',textDecoration:'none'}} to="/">
           Logout
           </Link>

        </button>
      </div></div>
    );
  }
}

export default FarmerSignin;