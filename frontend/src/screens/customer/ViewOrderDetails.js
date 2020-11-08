import React, {Component} from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router-dom';
import ViewOrderDetails from './ViewOrderDetails';

export default class Orders extends Component{
   
    render(){
       const orders = this.props.location.data
        return(
            <div className="row">
            {orders.map((u)=>(
              
               <div className="col-md-4">
                   <div className="card" >
                        <img className="card-img-top" src="..." alt='' />
                        <div className="card-body">
                            <p className="card-heading">{u.name}</p>
                            <p className="card-desc">Price: {u.price}</p>
                            <p className="card-desc">Quantity: {u.available_quantity} Rs.</p>
                        </div>
                    </div>
                </div>
               
              
           
            ))}
            </div>
        )
    }
}
