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
               <div>
               <div className="col-md-3">
                   <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <div style={{'display':'flex'}}> 
                                <h5 className="card-title">{u.name}</h5>
                            </div>
                            <p className="card-text">Price: {u.price}</p>
                            <p className="card-text">Quantity: {u.available_quantity} Rs.</p>
                        </div>
                    </div>
                </div>
               
              
            </div>
            ))}
            </div>
        )
    }
}
