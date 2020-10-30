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
            data: []
        }

    }
   
    componentDidMount() {
            const product = this.props.location.data
            axios.get('http://localhost:5000/farmer/option/'+product)
            .then(res => 
                {
                    this.setState(
                        {
                                data : res.data
                        }
                    )
                    // data = res.data
                    // console.log(data)
                }
            )
            // axios.get('http://localhost:5000/farmer/farmer-details/'+farmer_id)
            // .then( res => console.log(res))

       

      }

      

    render(){
        return(
            
            <div className="row" style={{padding:"30px"}}>
                Test
                <ul className="products">
                    { this.state.data.length ?

                        <div>
                            { 
                                this.state.data.map((u)=> (
                                
                                <div className="col-md-3">
                                    <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                                        
                                        <div> Name: {u.name}</div>
                                        <div>Price : {u.price}</div>
                                        <div> Available Quantity: {u.available_quantity}</div>

                                        
                                        <button>
                                            <Link to={{ pathname:"/customer/products-offered/moredetails", data:u.farmer_id }}>
                                            View farmer Details
                                            </Link>
                                            
                                        </button>
                                        {/* Add to cart comes here connection left */}
                                        <button>
                                            Add to cart
                                        </button>
                                    </div>
                                
                                </div>))
                            }
                           
                        </div>
                        : 
                        <div>No Sellers available</div>
                    }
                       
                </ul> 
               
            </div>
           
                );
    }

}
