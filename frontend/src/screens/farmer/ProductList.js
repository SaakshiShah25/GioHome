import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router-dom';
import empty_image from "../../stock_images/empty_image.jpg"
import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class ProductList extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);

        this.state={
            products:[],
            name:'',
        }
    }

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

    handleChange(product){
        const addedproduct = {
            name:product.name,
            description: product.description,
            price: product.price,
            available_quantity: product.available_quantity,
            date_produced:product.date,
            life: product.life,
        }
        const obj = getFromStorage('email');
        console.log("Email",obj)
        const id =  obj

        axios.post('http://localhost:5000/farmer/edit/'+id, addedproduct)
        .then(res => {
            console.log("!",res.data)
            if (res.data){
                alert("Already in your list")
            }
            else{
                alert("Done")
            }
        })
       
    };

    

   
   
    render(){
        return(
           
                
            
            <div>
                <div style={{marginTop:30 ,display:'flex',justifyContent:'center'}}>
                {/* Please use history here  */}
                
                <Link style={{textDecoration:'none'}} to="/product/add" >
                <button className="other-button">Add products
                </button>
                </Link>
               
                </div>
                <div className="row">

                {this.state.products.map((u)=>(
                    <Fragment>
                    <div className="col-md-4">
                        <div className="card green lighten-5" style={{width:'18rem','margin-top':'20px'}}>
                        <Link to={'' + u._id}>
                    
   
                        <img
                        
                        className="product-image"
                        
                        src={u.image || empty_image }
                        
                        height="200"
                        width="200"
                        />
                    </Link>
                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                            <div className="card-body">
                               
                                <p style={{'textAlign':'center'}} className="card-heading"><Link className="link" to={'' + u._id}>{u.name}</Link></p>
                               
                                <div className="card-desc">{u.description}</div>
                                <div className="card-details">Price: ₹{u.price}</div>
                                <div className="card-details">Life: {u.life} days</div>
                                {/* <p className="card-text">{u.description}</p>
                                <p className="card-text">Stock: {u.available_quantity}kg</p> */}
                                
                            </div>
                            <button className="card_button-green" value={this.state.name} onClick={() =>this.handleChange(u)}>Add to list</button>
                            
                            {/* <button className="card_button" onClick={()=> this.setState({ showForm: true ,formdata: u})}>
                                Update
                            </button>
                            
                            <button className="card_button" onClick={()=>this.remove(u.name)}>Stop Offering</button> */}
                            
                              
                            
                        </div>
                    </div>
                    
                    </Fragment>
                ))}
                </div>
            </div>

               

        );
    }
}
