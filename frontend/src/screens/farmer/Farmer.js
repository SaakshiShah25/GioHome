import React, {Component,Fragment} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import findUser from '../../../../backend/models/farmer/farmer.model'
// const Farmer = require('../../models/farmer/farmer.model.js');

export default class FarmerPage extends Component{
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state={
            products:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/farmer/update')
          .then(response => {
            console.log(response.data)
            this.setState({ products: response.data })
            console.log(this.state.products[0])
          })
          .catch((error) => {
            console.log(error);
          })
      }

      showModal(){
          document.getElementById('product_modal').style.display='block'
      }
      handleClose(){
        document.getElementById('product_modal').style.display='none'
      }
      handleChange(e){
          console.log(e.target.value)
      }
    render(){
        return(
           
            <div className="row">
                <div>
                    <button variant="btn btn-success">
                    <Link to="/product" >Offer New Products</Link>
                    </button>
                </div>
                {this.state.products.map((u)=>(
                <Fragment>
                    <div className="col-md-3">
                        <div className="card" style={{width:'18rem','margin-top':'20px'}}>
                            <img className="card-img-top" src="..." alt="Card image cap" />
                            <div className="card-body">
                                <div style={{'display':'flex'}}> 
                                    <h5 className="card-title">{u.name}</h5>
                                    <button onClick={this.showModal} style={{'margin-left':'40px'}}>Details</button>
                                </div>
                                <p className="card-text">{u.description}</p>
                                <p className="card-text">Stock: {u.available_quantity}kg</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'none'}} className="modal" tabindex="-1" role="dialog" id="product_modal">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" onChange={this.handleChange}>Price: {u.price}</h5>
                                    <button onClick={this.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Life: {u.life}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
                ))}
                
            </div>
           
        );
    }
}
