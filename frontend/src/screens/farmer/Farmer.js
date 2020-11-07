import React, {Component,Fragment} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'


import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class FarmerPage extends Component{
    constructor(props){
        super(props);
        // this.showModal = this.showModal.bind(this)
        // this.handleClose = this.handleClose.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleLifeChange = this.handleLifeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state={
            products:[],
            price:'',
            life:'',
            showForm: false,
            formdata : {}
        }
    }
    
    componentDidMount() {

      const obj = getFromStorage('email');
      console.log("Email",obj)
      const id =  obj
      console.log(id)

        axios.get('http://localhost:5000/farmer/update/'+id)
          .then(response => {
            console.log(response.data)
            this.setState({ products: response.data })
            
          })
          .catch(
            (error) => {
            console.log(error);
          }
          )


      }

    
      handlePriceChange(e){
          this.setState({price:e.target.value})
         
    }
      handleLifeChange(e){
          this.setState({life:e.target.value})
    }

      hideModal = () => {
        this.setState({ showForm: false });
      };
     
      handleSubmit(e){

        e.preventDefault();
        // const updatedData = this.state.formdata
        //   console.log(updatedData);
        //   updatedData.price = this.state.price
        //   updatedData.life = this.state.life
        //   console.log(updatedData)
        
        // const id=this.state.formdata.name
        // console.log(this.state.formdata.name)

        const updatedData ={
          price:this.state.price,
          life:this.state.life
        }
        
        const obj = getFromStorage('email');
        console.log("Email",obj)
        const id = this.state.formdata.name
       

      axios.post('http://localhost:5000/farmer/updateproduct/'+id, updatedData)

      .then(res => console.log(res.data))
      
      .catch((error) => {
          console.log(error);
        })

    }

      showform = () => {
        return (
            <Modal.Dialog>
            <Modal.Header className='model'>
                <Modal.Title>{this.state.formdata.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body className='model'>
                <form onSubmit={this.handleSubmit}>
                    <label>Price: </label>
                    <input type="text"  onChange={this.handlePriceChange}></input>
                    <label>Life: </label>
                    <input type="text"  onChange={this.handleLifeChange}></input>
                    <input className='card_button-green' type="submit" value="Save"></input>
                </form>
            </Modal.Body>

            <Modal.Footer className='model'>
                <button className='card_button-red' variant="secondary" onClick={()=>this.setState({ showForm: false })}>Close</button>
                
            </Modal.Footer>
            </Modal.Dialog>
          );
      }

      remove = (u) =>{
        console.log("Checking data",u)
        axios.get("http://localhost:5000/farmer/remove-product/"+u)
        .then(
            res => console.log( res,"Product Deleted" )
        )
        .then(window.location.reload())
  }
    
      
    render(){
        return(
           
            <div >
                <div style={{marginTop:30, display:"flex",justifyContent:"center"}}>
                    
                    <Link style={{textDecoration:'none'}} to="/product" >
                    <button className="other-button">
                    Offer New Products</button>
                    </Link>
                    
                </div>
                <div className="row">
                {this.state.products.map((u)=>(
                <Fragment>
                    <div className="col-md-4">
                        <div className="card green lighten-5" style={{width:'18rem','margin-top':'20px'}}>
                            <img className="card-img-top" src="..." alt="Card image cap" />
                            <div className="card-body">
                                <div style={{'display':'flex'}}> 
                                    <h5 className="card-title">{u.name}</h5>
                                </div>
                                <p className="card-text">{u.description}</p>
                                <p className="card-text">Stock: {u.available_quantity}kg</p>
                                
                            </div>
                            
                            <button className="card_button-green" onClick={()=> this.setState({ showForm: true ,formdata: u})}>
                                Update
                            </button>
                            
                            <button className="card_button-red" onClick={()=>this.remove(u.name)}>Stop Offering</button>
                            
                              
                            
                        </div>
                    </div>
                    
                </Fragment>
                ))}
                {/* Out of fragment but the value triggered from a specific card in the fragment */}
                  {this.state.showForm ? this.showform() : null}
            </div></div>
           
        );
    }
}

// <form onSubmit={this.handleSubmit}>
//                                     <label for="price">Price:
//                                     <input type="text" id="price" name="price" value={this.state.price} onChange={(u)=>this.handleChange()}></input>
//                                     </label>
//                                     <label for="life">Life:
//                                     <input type="text" id="life" name="life" value={this.state.life} onChange={this.handleChange}/>
//                                     </label>
//                                     <input type="submit" value="Save Changes" />
//                                 </form>