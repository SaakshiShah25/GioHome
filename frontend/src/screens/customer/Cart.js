import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Cart extends Component{

    constructor(props){

        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state={
            products:[],
            name:'',
        }

    }
    remove(id)
    {
        console.log(typeof(id))
        axios.get('http://localhost:5000/cart/remove/'+id)
        .then(res => console.log(res.data))
        .then(alert("Done")).then(window.location.reload())   
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
        .then(res => console.log(res.data))
        .then(alert("Done"))

    };

   
    componentDidMount() {

        axios.get('http://localhost:5000/cart/')
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
                        <div>
                   <div>
                       {u.name}
                   </div>
                   <div>
                        {u.description}
                    </div>
                        <div>
                    {u.price}
                        </div>
                        <button onClick={()=>this.remove(u.name)}>
                            Remove from Cart
                        </button>

                        </div>
                    ))}
                </ul> 
            </div>
        );
    }

}
