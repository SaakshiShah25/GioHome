import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

export default class CartCheckout extends Component{

    constructor(props){

        super(props);

        this.state={
            products:[],
            net_amount:0
        }

    }

    
    componentDidMount() {
      const obj = getFromStorage('email');

      console.log("Email",obj)
      const id =  obj

        axios.get('http://localhost:5000/cart/'+id)
          .then(response => {
            console.log(response.data)
            this.setState({ products: response.data})
            console.log(this.state.products)
            let net_amount=0;
            for(let i=0;i<this.state.products.length;i++){
              net_amount+=this.state.products[i].price*this.state.products[i].available_quantity
              this.setState({
                net_amount:net_amount
              })
            }
            
            console.log(this.state)
          })
          .catch((error) => {
            console.log(error);
          })

          

      }

      
    render(){
        return(
           <div className="row">
                <ul className="products">
                
                <div className="col-md-2"></div>
                <div className="col-md-6">
                <div className="card green lighten-5" style={{width:'18rem','margin-top':'20px'}}>
                {this.state.products.map((u)=>(
                <Fragment>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                            <div className="card-body">
                                <p className="card-heading">{u.name}</p>
                                <p className="card-details">Price: {u.price}</p>
                                <p className="card-details">Quantity Ordered: {u.available_quantity}kg</p>
                                <p className="card-desc">Total product price: {u.price*u.available_quantity}</p>
                            </div>
                </Fragment>
             
                ))}
                <div style={{'textAlign':"center"}}>Net Total:{this.state.net_amount}</div>
                <button className='other-button'>
                   <Link style={{color:'whitesmoke',textDecoration:'none'}} to={{pathname:"/cart/checkout/details", data:{products:this.state.products, net_amount : this.state.net_amount}}}>Fill Details</Link> 
                </button>
                </div>
                </div>
                
              <div className="col-md-2"></div>
                </ul> 
            </div>
           
           
        );
    }

}