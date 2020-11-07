import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class LandingCustomer extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);

        this.state={
            products:[],
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
        }
        
        axios.post('http://localhost:5000/cart/edit', addedproduct)
        
  
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

        const userType = getFromStorage("type")
       
        axios.get('http://localhost:5000/stock-product/')
          .then(response => {
            this.setState({ products: response.data })
            console.log(this.state.products)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    render(){
        return(
           
                
            
            <div className="row">
                

                {/* <ul className="products"> */}
                    {this.state.products.map((u)=>(
                    
                    <div className="col-md-4">

                    {/* <Link to={'' + u._id}>
                        <img
                        className="product-image"
                        src={u.image}
                        alt="product"
                        />
                    </Link> */}
                    <div className='column'>
                    <div className="product-name">
                    
                        <Link style={{textDecoration:'none'}} to={{pathname:'/customer/products-offered',data:{name: u.name,id: u.farmer_id}}}>
                        <button className='customer-button'>{u.name}</button>
                        </Link>
                        
                    </div></div>
                    

                        {/* not needed for now transfering to somehwere else */}
                    {/* <button variant="btn btn-success" value={this.state.name} onClick={() =>this.handleChange(u)}>Add to Cart</button> */}

                    </div>
                    
                    
                    ))}
                {/* </ul>  */}
            </div>
        );
    }

}
