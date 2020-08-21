import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class AddProduct extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLife = this.onChangeLife.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            description:'',
            price:0,
            available_quantity:0,
            date_produced:new Date(),
            life:0
        }
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangePrice(e) {
        this.setState({
          price: e.target.value
        })
      }

      onChangeQuantity(e) {
        this.setState({
          available_quantity: e.target.value
        })
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        })
      }

      onChangeLife(e) {
        this.setState({
          life : e.target.value
        })
      }
      
      onSubmit(e) {
        e.preventDefault();
    
        const product = {
          name: this.state.name,
          description: this.state.description,
          price: this.state.price,
          available_quantity: this.state.available_quantity,
          date: this.state.date,
          life: this.state.life
        }
    
        console.log(product);
    
        axios.post('http://localhost:5000/product/add', product)
          .then(res => console.log(res.data));
    
      }
    render(){
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <h3>Add Grocery Product</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name : </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                    <label>Description : </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Price :</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                    <label>Quantity</label>
                    <input 
                        type="number" 
                        min="1"
                        className="form-control"
                        value={this.state.available_quantity}
                        onChange={this.onChangeQuantity}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>
                    <div className="form-group">
                    <label>Life :</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.life}
                        onChange={this.onChangeLife}
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Add Product" className="btn btn-primary" />
                    </div>
                </form>
                </div>
            </div>
        )
    }
}
