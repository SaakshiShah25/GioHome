import React, {Component} from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router-dom';

export default class ProductList extends Component{
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
        
        axios.post('http://localhost:5000/farmer/edit', addedproduct)
        .then(res => console.log(res.data))
        .then(alert("Done"))
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
                <div>
                {/* Please use history here  */}
                <button variant="btn btn-success">
                <Link to="/product/add" >Add products</Link>
                </button>
                </div>

                <ul className="products">
                    {this.state.products.map((u)=>(
                    <li key={u._id}>
                    <div className="product">
                    <Link to={'' + u._id}>
                        <img
                        className="product-image"
                        src={u.image}
                        alt="Product Image"
                        height="200"
                        width="200"
                        />
                    </Link>
                    <div className="product-name">
                        <Link to={'' + u._id}>{u.name}</Link>
                    </div>
                    <div className="product-description">{u.description}</div>
                    <div className="product-price">Price: {u.price}</div>
                    <div className="product-life">Life: {u.life}</div>
                    <button variant="btn btn-success" value={this.state.name} onClick={() =>this.handleChange(u)}>Add to list</button>
                    </div>
                    </li>
                    
                    ))}
                </ul> 
            </div>
        );
    }
}
