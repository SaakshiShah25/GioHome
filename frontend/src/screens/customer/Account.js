import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class Account extends Component{
    constructor(props){
        super(props);
    

        this.state={
            firstname : "",
            lastname : "",
            address : [],
            email : "",
            showForm:false,
            formdata: {},
            temp : "",
            isLoading:false
        }

        this.logout = this.logout.bind(this);
    }
    handleChange = e => {
        this.setState({
              temp: e.target.value
        });
        }
    
        onSubmit = () => {
            const address = {address: this.state.temp}
            console.log(address)
            axios.post('http://localhost:5000/account/updateAddress',address)
            .then(
                res => console.log(res,"Address added")
            )
        }
    showform = () => {
        return (
            <Modal.Dialog>

                <Modal.Header className='model'>
                    <Modal.Title>Add your New Address</Modal.Title>
                </Modal.Header>

                <Modal.Body className='model'>
                    <form onSubmit={this.handleSubmit}>
                        
                        <textarea  name="address" placeholder="Enter Your Address" 
              id="address"
              onChange={this.handleChange}
              defaultValue={this.state.temp}>

              </textarea>
                           
                        <input className='card_button-green' type="submit" value="Save Address" onClick = {this.onSubmit}></input>
                    </form>
                </Modal.Body>

                <Modal.Footer className='model'>
                    <button className='card_button-red' variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
                </Modal.Footer>

            </Modal.Dialog>
          );
      }

      remove = (u) =>{
            console.log("Test",u)
            const address = u;
            axios.get("http://localhost:5000/account/remove/"+address)
            .then(
                res => console.log( res,"Address Deleted" )
            )
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
        
    componentDidMount() {

        const obj = getFromStorage('email');
        console.log("Email",obj)
        const id =  obj

        axios.get('http://localhost:5000/account/'+id)
          .then(res => {
            this.setState({ 
                firstname:res.data.firstName,
                lastname: res.data.lastName,
                email : res.data.email,
                address : res.data.address
            })
           

          })
          .catch((error) => {
            console.log(error);
          })
      }
    render(){
        return(
           
                
            
            <div>
                
                <h3 style={{textAlign:'center'}}>{this.state.firstname} {this.state.lastname}</h3>
                <h3 style={{textAlign:'center'}}>{this.state.email}</h3>
                {/* Redirect to orders of the customer */}
                <div style={{display:"flex",justifyContent:'center',marginTop:'100px'}}>
                <button className='other-button'>
                    <Link style={{textDecoration:'none',color:'whitesmoke'}} to="/orders"> My Orders</Link>
                </button></div>
                <h2 style={{textAlign:'center'}} >  My saved Addresses</h2>
                {
                    this.state.address.map(
                        u=> 
                        <div>
                        <h4 style={{textAlign:'center'}}>
                            {u}
                            
                        
                        <button onClick={()=>this.remove(u)}>x</button></h4>
                        </div>


                )}
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
               
                  <button className='card_button-green' onClick={()=>this.setState({showForm:true})}>Add new Address</button>

                  {this.state.showForm ? this.showform() : null}

                  <button className='card_button-red' onClick={this.logout}><Link style={{textDecoration:'none',color:'whitesmoke'}} to="/">Logout</Link></button>
                </div>
                
            </div>
        );
    }

}
