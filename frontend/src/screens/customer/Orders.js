import React, {Component} from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router-dom';
import ViewOrderDetails from './ViewOrderDetails';

export default class Orders extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);

        this.state={
            orders:[],
            name:'',
        }
    }

    handleClick=o=>{
        o.map((order)=>{
            console.log(order) 
        })
    }
    componentDidMount() {
        axios.get('http://localhost:5000/orders/')
          .then(response => {
            this.setState({ orders: response.data })
            console.log(this.state.orders)
           
          })
          .catch((error) => {
            console.log(error);
          })
          
      }
    
    
    render(){
        return(
            <div className="row">
            {this.state.orders.map((u)=>(
                
               
                <div className="col-md-3">
                   <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <div style={{'display':'flex'}}> 
                                <h5 className="card-title">{u.name}</h5>
                                <button style={{'margin-left':'40px'}}>Mark As Delivered</button>
                            </div>
                            
                            <p className="card-text">Shipping Address: {u.address}</p>
                            <p className="card-text">Price: {u.net_amount} Rs.</p>
                        </div>
                        <button >
                            <Link to={{pathname:'/orders/view',data:u.products}}>View details</Link>
                        </button>
                    </div>
                    
                </div>
               
                
                )
            )}
            </div>
        )
    }
}

