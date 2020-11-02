import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class Cart extends Component{

    constructor(props){

        super(props);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state={
            products:[],
            name:'',
            showForm:false,
            formdata: {},
            available_quantity:'',
            address : []
        }

    }
    remove(id)
    {
        console.log(typeof(id))
        axios.get('http://localhost:5000/cart/remove/'+id)
        .then(res => console.log(res.data))
        .then(alert("Done")).then(window.location.reload())   
    }

    handleQuantityChange(e){
        this.setState({available_quantity:e.target.value})
    }

    

    handleSubmit(e){

        e.preventDefault();
        const updatedData = this.state.formdata
        updatedData['address'] = this.state.address
        updatedData.available_quantity = this.state.available_quantity;
  

        const id=this.state.formdata.name


      axios.post('http://localhost:5000/cart/updatecart/'+id, updatedData)
      .then(res => console.log(res.data))
      .catch((error) => {
          console.log(error);
        })
    }
    componentDidMount() {
        const obj = getFromStorage('email');
        console.log("Email",obj)
        const id =  obj
      
        console.log("Check Id", id)
        axios.get('http://localhost:5000/cart/'+id)
          .then(response => {
              console.log(response.data)
            this.setState({ products: response.data })
            console.log(this.state.products)
          })
          .catch((error) => {
            console.log(error);
          })

          axios.get('http://localhost:5000/account/'+id)
          .then(response => {
              this.setState({
                  address : response.data.address
              })
          })

      }

      showform = () => {
        return (
            <Modal.Dialog>

                <Modal.Header>
                    <Modal.Title>Select Quantity</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <label for="quantity">Quantity: </label>
                        <input type="number"   onChange={this.handleQuantityChange}></input>
                            <div>Total: {this.state.formdata.price}*{this.state.available_quantity}</div>
                        <input type="submit" value="Save"></input>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
                </Modal.Footer>

            </Modal.Dialog>
          );
      }

    render(){
        return(
            
            <div className="row">
                <ul className="products">
                    { this.state.products.length ?

                        <div>
                            { 
                                this.state.products.map((u)=> (
                                
                                <div className="col-md-3">
                                    <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                                        <div>{u.name}</div>
                                        <div>{u.description}</div>
                                        <div>{u.price}</div>
                                            <button onClick={()=>this.setState({showForm:true,formdata: u})}>
                                                Select Quantity
                                            </button>

                                            <button onClick={()=>this.remove(u.name)}>
                                                Remove from Cart
                                            </button>
                                    </div>
                                
                                </div>))
                            }
                            <button><Link to="/cart/checkout">Proceed to Checkout</Link></button>
                        </div>
                        : 
                        <div>Cart is empty!</div>
                    }
                        {this.state.showForm ? this.showform() : null}
                </ul> 
               
            </div>
           
                );
    }

}
