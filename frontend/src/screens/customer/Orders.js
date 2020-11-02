import React, {Component} from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router-dom';
import ViewOrderDetails from './ViewOrderDetails';

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';


export default class Orders extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);

        this.state={
            orders:[],
            name:'',
            farmer_doc:[]
        }
    }

    handleClick=o=>{
        o.map((order)=>{
            console.log(order) 
        })
    }
    componentDidMount() {
        const id = getFromStorage("email")
        const userType = getFromStorage("type")
        console.log(userType)
        if(userType=="Customer")
        {
            axios.get('http://localhost:5000/orders/'+id)
            .then(response => {
              this.setState({ orders: response.data })
              console.log(this.state.orders)
             
            })
            .catch((error) => {
              console.log(error);
            })
        }

        if(userType=="Farmer"){
           console.log("We are seeing orders of the Farmers")
          
            axios.get('http://localhost:5000/orders/farmer')
            .then(res=>{
                console.log(res)
                this.setState({
                    farmer_doc:res.data
                })
                console.log(this.state.farmer_doc)
            })
            .catch(err=>console.log(err))
        
    
        //    You can write all the endpoints of the Farmers here 
        //    The Frontend might require some conditional rendering in the frontend
        }
        
          
      }
    
    
    render(){
        return(
            <div className="row">
                { this.state.orders.length
                        ?
                        <div>
                        {  this.state.orders.map((u)=>(
                
               
                            <div className="col-md-3">
                               <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                                    <img className="card-img-top" src="..." alt="Card image cap" />
                                    <div className="card-body">
                                        <div style={{'display':'flex'}}> 
                                            <h5 className="card-title">{u.name}</h5>
                                          
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
                        )
                        }
                        </div>
                    : 
                    <div>
                        No orders yet?
                        <Link to='/customer'> Find something for you </Link> 
                        
                    </div>
                }
            
            </div>
        )
    }
}

