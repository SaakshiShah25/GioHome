import React, {Component,Fragment} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'

export default class Cart extends Component{

    constructor(props){

        super(props);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state={
            products:[],
            name:'',
            showForm:false,
            formdata: {},
            available_quantity:''
        }

    }
    remove(id)
    {
        console.log(typeof(id))
        axios.get('http://localhost:5000/cart/remove/'+id)
        .then(res => console.log(res.data))
        .then(alert("Done")).then(window.location.reload())   
    }

    handleQuantityChange(e){
        this.setState({available_quantity:e.target.value})
    }

    

    handleSubmit(e){
        e.preventDefault();
        const updatedData = this.state.formdata
          console.log(updatedData);
          updatedData.available_quantity = this.state.available_quantity;
          console.log(updatedData)
          const id=this.state.formdata.name

      axios.post('http://localhost:5000/cart/updatecart/'+id, updatedData)
      .then(res => console.log(res.data))
      .catch((error) => {
          console.log(error);
        })
    }
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

      showform = () => {
        return (
            <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Select Quantity</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={this.handleSubmit}>
                    <label for="quantity">Quantity: </label>
                    <input type="number" min="1" max="10"  onChange={this.handleQuantityChange}></input>
                        <div>Total: {this.state.formdata.price}*{this.state.available_quantity}</div>
                    <input type="submit" value="Save"></input>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
            </Modal.Footer>
            </Modal.Dialog>
          );
      }

    render(){
        return(
           
            <div className="row">
                <ul className="products">
                    {this.state.products.length?
                    this.state.products.map((u)=>(
                        
                        <div className="col-md-3">
                        <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                            <div>{u.name}</div>
                            <div>{u.description}</div>
                            <div>{u.price}</div>
                            <button onClick={()=>this.setState({showForm:true,formdata: u})}>
                                Select Quantity
                            </button>
                            <button onClick={()=>this.remove(u.name)}>
                                Remove from Cart
                            </button>
                        </div>
                        </div>
                        
                    )):
                    
                    <div>Cart is empty!</div>
                    }
                    {this.state.showForm ? this.showform() : null}
                </ul> 
            </div>
        );
    }

}
