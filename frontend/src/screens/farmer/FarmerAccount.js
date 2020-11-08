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
      userType: '',
      data: ""
      
    };


    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    const obj1 = getFromStorage('email');
      console.log("Email",obj1)
      const id =  obj1
      console.log("Testing",id)
      axios.get('http://localhost:5000/farmer/farmer-details/'+id)
      .then(response => {
        console.log("test",response.data[0])
        this.setState({ data: response.data[0] })
        
      })

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
      <h2 style={{textAlign:'center',marginTop:'200px'}}>My Farmer's Account</h2>
      
      <div  style={{display:"flex",justifyContent:"center"}}>
      <div>
          <div>{this.state.data.firstName} {this.state.data.lastName}</div>
          <div> {this.state.data.location} </div>
      </div>
      <button className="card_button-red" onClick={this.logout}>
        <Link onClick={this.logout} style={{textDecoration:'none',color:"whitesmoke"}} to="/farmer-signin">
        Logout
        </Link>
        </button>
      </div>
      </div>
    );
  }
}

export default FarmerAccount;