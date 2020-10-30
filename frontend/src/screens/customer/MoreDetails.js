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

export default class MoreDetails extends Component{

    constructor(props){

        super(props);
        
        this.state={
            data: []
        }

    }
   
    componentDidMount() {
            const farmer_id = this.props.location.data
            axios.get('http://localhost:5000/farmer/farmer-details/'+farmer_id)
            .then(res => 
                {
                    this.setState(
                        {
                                data : res.data
                        }
                    )
                    // data = res.data
                    console.log(res.data)
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
                                        <div> Location : {u.location}</div>
                                        {/* <div> Available Quantity: {u.available_quantity}</div> */}

                                        
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
