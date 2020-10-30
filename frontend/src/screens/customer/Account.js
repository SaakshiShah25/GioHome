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
            temp : ""

           
        }
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

                <Modal.Header>
                    <Modal.Title>Add your New Address</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        
                        <textarea  name="address" placeholder="Enter Your Address" 
              id="address"
              onChange={this.handleChange}
              defaultValue={this.state.temp}>

              </textarea>
                           
                        <input type="submit" value="Save Address" onClick = {this.onSubmit}></input>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
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
                
                <div>{this.state.firstname} {this.state.lastname}</div>
                <div>{this.state.email}</div>
                {/* Redirect to orders of the customer */}
                <button>
                    <Link to="/orders"> My Orders</Link>
                </button>
                <div>  My saved Addresses</div>
                {
                    this.state.address.map(
                        u=> 
                        <div>
                        <div>
                            {u}
                            
                        </div>
                        <button onClick={()=>this.remove(u)}>x</button>
                        </div>


                )}

                <button onClick={()=>this.setState({showForm:true})}>Add new Address</button>

                {this.state.showForm ? this.showform() : null}
                
            </div>
        );
    }

}
