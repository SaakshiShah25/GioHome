import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router-dom';

export default class ProductList extends Component{
    constructor(props){
        super(props);

        this.state={
            products:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/stock-product/')
          .then(response => {
            this.setState({ products: response.data })
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
                {this.state.products.map((u)=>(
                <div className="col-md-3">
                <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                    <img className="card-img-top" src="..." alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{u.name}</h5>
                        <p className="card-text">{u.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{u.price}</li>
                        <li className="list-group-item">{u.available_quantity}</li>
                        <li className="list-group-item">{u.life}</li>
                    </ul>
                </div>
                </div>
                ))}
                
            </div>
        );
    }
}
