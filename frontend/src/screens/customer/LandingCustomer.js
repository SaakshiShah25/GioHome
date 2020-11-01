import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


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
                

                <ul className="products">
                    {this.state.products.map((u)=>(
                    <li key={u._id}>
                    <div className="product">

                    <Link to={'' + u._id}>
                        <img
                        className="product-image"
                        src={u.image}
                        alt="product"
                        />
                    </Link>
                    <div className="product-name">
                        <Link to={{pathname:'/customer/products-offered',data:{name: u.name,id: u.farmer_id}}}>{u.name}</Link>
                    </div>
                    

                        {/* not needed for now transfering to somehwere else */}
                    {/* <button variant="btn btn-success" value={this.state.name} onClick={() =>this.handleChange(u)}>Add to Cart</button> */}

                    </div>
                    </li>
                    
                    ))}
                </ul> 
            </div>
        );
    }

}
