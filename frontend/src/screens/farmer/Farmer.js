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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state={
            products:[],
            price:'',
            life:'',
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
          this.setState({[e.target.name]:e.target.value})
      }
      handleSubmit(e){
          e.preventDefault();
          const updatedData = {
            price:this.state.price,
            life:this.state.life
          }

          axios.post('http://localhost:5000/farmer/updateprod/' + this.props.match.params.id, updatedData)
          .then(res => console.log(res.data));
    
        window.location = '/';
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
                                </div>
                                <p className="card-text">{u.description}</p>
                                <p className="card-text">Stock: {u.available_quantity}kg</p>
                                <form onSubmit={this.handleSubmit}>
                                    <label for="price">Price:
                                    <input type="text" id="price" name="price" value={u.price} onChange={(u)=>this.handleChange()}></input>
                                    </label>
                                    <label for="life">Life:
                                    <input type="text" id="life" name="life" value={this.state.life} onChange={this.handleChange}/>
                                    </label>
                                    <input type="submit" value="Save Changes" />
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </Fragment>
                ))}
                
            </div>
           
        );
    }
}
