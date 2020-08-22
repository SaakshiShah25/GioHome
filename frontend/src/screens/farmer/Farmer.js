import React, {Component} from 'react';
import axios from 'axios';
// import findUser from '../../../../backend/models/farmer/farmer.model'
// const Farmer = require('../../models/farmer/farmer.model.js');

export default class FarmerPage extends Component{
    constructor(props){
        super(props);
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
    render(){
        return(
            <div className="row">
                
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
