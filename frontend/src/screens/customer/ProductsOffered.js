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

export default class ProductsOffered extends Component{

    constructor(props){

        super(props);
        
        this.state={

            data: [],
            farmer_data : [],
            showForm:false,
            name:'',

        }

    }
    handleChange(product){
        const addedproduct = {
            name:product.name,
            description: product.description,
            price: product.price,
            available_quantity: product.available_quantity,
            date_produced:product.date,
            life: product.life,
            farmer_email:product.farmer_email
        }
    
    console.log(addedproduct)
    const obj = getFromStorage('email');
    console.log("Email",obj)
    const id = obj
    axios.post('http://localhost:5000/cart/edit/' + id, addedproduct)
        
  
        .then( res => 
            {
                if(res.data)
                {
                    alert("Already in your cart")
                }
                else{
                    alert("Done")
                }
            }
            
            )
        
        
    };
   
    componentDidMount() {

            const product = this.props.location.data.name
           

            
            
            axios.get('http://localhost:5000/farmer/option/'+product)
            .then( res => 
                {
                    this.setState(
                        {
                                data : res.data
                        }
                    )
              console.log(this.state.data)
                    
                }
            )
          
            
            axios.get('http://localhost:5000/farmer/farmer-details/'+this.state.data.farmer_email)
            .then(
                res => 
                {
                    this.setState(
                        {
                                farmer_data : res.data
                        }
                    )
                    // data = res.data
                   
                }
            )

            }
            


            // axios.get('http://localhost:5000/farmer/farmer-details/'+farmer_id)
            // .then( res => console.log(res))

            showDetails = (id) => {

                
                console.log(id)
                axios.get('http://localhost:5000/farmer/farmer-details/'+id)
            .then(
                res => 
                {
                    const data = res.data
                    this.setState(
                        {
                                farmer_data :data
                        }
                    )
                  
                   
                    console.log('Farmer Data New-> ',this.state.farmer_data)

                    this.setState({ showForm: true })
                    
                }
            )
           
            

            }
              
            showform = () => {
                return (
                    
                    <Modal.Dialog>
        
                        <Modal.Header className='model' >
                            <Modal.Title >Farmer Details</Modal.Title>
                        </Modal.Header>
        
                        <Modal.Body className='model'>
                            <div>Name : {this.state.farmer_data[0].firstName}</div>
                            <div>Location: {this.state.farmer_data[0].location}</div>
                        </Modal.Body>
        
                        <Modal.Footer className='model'>
                            <button className='card_button-red' variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
                        </Modal.Footer>
        
                    </Modal.Dialog>
                
                  );
              }
      

    render(){
        return(
            
            <div className="row" style={{padding:"30px"}}>
                <ul className="products">
                    { this.state.data.length ?

                        <div>
                            { 
                                this.state.data.map((u)=> (
                                
                                <div className="col-md-3">
                                    <div className="card" style={{marginLeft:'40px'}}>
                                        
                                        <div className="card-heading"> Name: {u.name}</div>
                                        <div className="card-desc">Price : {u.price}</div>
                                        <div className="card-desc"> Available Quantity: {u.available_quantity}</div>
                                       

                                        <div className="button-display">
                                            <button className='card_button-green'  onClick={() =>this.handleChange(u)}>Add to Cart</button>
                                            <button className='card_button-red' onClick={()=>this.showDetails(u.farmer_email)}>
                                                Farmer Details 
                                            </button>
                                        </div>
                                 
                                    </div>
                                
                                </div>))
                                 
                            }
                           
                        </div>
                        : 
                        <h1 style={{marginLeft:'300px',marginTop:'180px'}}>No sellers available right now :( </h1>
                    }
                    
                    {this.state.showForm ? this.showform() : null}
                </ul> 
               
            </div>
           
                );
    }

}
