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

        //   axios.get('http://localhost:5000/account/'+id)
        //   .then(response => {
        //       this.setState({
        //           address : response.data.address
        //       })
        //   })

      }

      showform = () => {
        return (
            <Modal.Dialog>

                <Modal.Header className='model'>
                    <Modal.Title>Select Quantity</Modal.Title>
                </Modal.Header>

                <Modal.Body className='model'>
                    <form onSubmit={this.handleSubmit}>
                        <label for="quantity">Quantity: </label>
                        <input type="number" min="1" max={this.state.formdata.available_quantity}  onChange={this.handleQuantityChange}></input>
                            <div>Total: ₹{this.state.formdata.price}*{this.state.available_quantity}</div>
                        <input className='card_button-green' type="submit" value="Save"></input>
                    </form>
                </Modal.Body>

                <Modal.Footer className='model'>
                    <button className='card_button-red' variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
                </Modal.Footer>

            </Modal.Dialog>
          );
      }

    render(){
        return(
            
            <div>
                <Fragment className="products">
                    { this.state.products.length ?
                        <div>
                        <div className="row">
                            { 
                                this.state.products.map((u)=> (
                                
                                <div className="col-md-3">
                                    <div className="card" >
                                        <div className="card-heading">{u.name}</div>
                                        <div className="card-desc">{u.description}</div>
                                        <div className="card-details">Price: ₹{u.price}</div>
                                        <div className="card-details">In Stock: {u.available_quantity}kg</div>
                                            <div className="button-display">
                                                <button className="card_button-green" onClick={()=>this.setState({showForm:true,formdata: u})}>
                                                    Select Quantity
                                                </button>

                                                <button className="card_button-red" onClick={()=>this.remove(u.name)}>
                                                    Remove from Cart
                                                </button>
                                            </div>
                                    </div>
                                
                                </div>))
                            }
                            </div>
                            <div style={{display:"flex",justifyContent:"center"}}>
                            <Link className="link" to="/cart/checkout">
                            <button className='other-button'>Proceed to Checkout</button>
                            </Link>
                            </div>
                        </div>
                        
                        : 
                        <h1 style={{textAlign:'center',marginTop:'180px'}}>Cart is empty!</h1>
                    }
                        {this.state.showForm ? this.showform() : null}
                </Fragment> 
               
            </div>
           
                );
    }

}
