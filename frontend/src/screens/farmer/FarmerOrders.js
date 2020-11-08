import React, {Component,Fragment, version} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'


import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class FarmerOrders extends Component{
    constructor(props){
        super(props);
        this.deliver = this.deliver.bind(this)
        this.getDetails = this.getDetails.bind(this)
        this.state={
           farmer_doc:[] ,
           prod_map:[],
           order:[],
           showForm:false,
           formdata: []
        }
    }
    componentDidMount(){
        const obj = getFromStorage('email');
        console.log("Email",obj)
        const id =  obj 
        axios.get('http://localhost:5000/orders/farmer/'+id)
        .then(res=>{
            console.log(res.data)
            this.setState({
                farmer_doc:res.data
            })
            console.log(this.state.farmer_doc)
            var map = new Map();
            this.state.farmer_doc.map((product)=>{
                if(!(map.has(product.name))){
                    map.set(product.name,[product.available_quantity,product.price])
                    // map.set(product.name,product.price)
                }
                else{
                    var q=map.get(product.name)
                    var quantity = q[0]
                    var price = q[1]
                    var new_quantity=quantity+product.available_quantity
                    var new_price=price+product.price

                    map.set(product.name,[new_quantity,new_price])
                 
                    this.setState({
                        prod_map:map
                    })
                }
            })
            console.log(this.state.prod_map)
            let prod_map=this.state.prod_map
            let order=[]
            for (let [key,value] of prod_map){
                order.push({key,value})
            }
            console.log(order)
            this.setState({
                order:order
            })

        })
        .catch(err=>console.log(err))
    
    }
   

    deliver = (product) => {
        const obj = getFromStorage('email');
        console.log("Email",obj)
        const id =  obj 
        console.log(product)
        axios.post("http://localhost:5000/farmer/deliver/" + id,product)
        .then((res)=>{
            if(res.data){
                alert("Product deliveved")
            }
            else{
                alert("Stock is empty")
            }
        })
        .catch((err)=>console.log(err))
    }

    getDetails = (prod_name) =>{
        this.setState({
            showForm:true
        })
        var temp=[]
        this.state.farmer_doc.map((u)=>{
            if(u.name==prod_name){
                temp.push(u)
            }
        })
        this.setState({
          formdata:temp  
        })
    }

    showform = () => {
        return (
            <Modal.Dialog>
            
            <div>
            {this.state.formdata.map((u)=>(
            <div>
            <Modal.Header className='model'>
                <Modal.Title>{u.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='model'>
                <div>Price: {u.price}</div>
                <div>Quantity: {u.available_quantity}</div>
            </Modal.Body>
            </div>
            ))}
           

            <Modal.Footer className='model'>
                <button className='card_button-red' variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
                
            </Modal.Footer>
            </div>
            </Modal.Dialog>
          );
      }

    render(){
       return(
           <div className="row">
           {this.state.order.map((prod_name)=>(
               <div style={{marginLeft:'30px'}} className="col-md-3">
               <div className="card green lighten-5">
                    <div className="card-details">Product: {prod_name.key}</div>
                    <div className="card-details">Quantity: {prod_name.value[0]} kg</div>
                    <div className="card-desc">Price: {prod_name.value[0]*prod_name.value[1]}</div>
                    <button className='card_button-red' onClick={()=>this.getDetails(prod_name.key)}>
                    View Details
                    </button>
                    </div>
               </div>
               
               
           ))}
           {this.state.showForm ? this.showform() : null}
           </div>
       )
    }
}