import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

import React, { Component } from "react";
import storage from "../../Firebase/index";


// Each time a photo is uploaded Its name is set to the current time date etc Property
// If any issues reported please change it it name at three places in this page

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
            life:0,
            image_name: "",
            show: false,
            image: null,
            url: "",
            progress: 0
        }
    }

    handleChange = e => {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({ image }));
      }
    };
  
    handleUpload = () => {

      const { image } = this.state;
      
      // Getting unique number for image
      var today = new Date();
      const time =String(today.getMonth()+1)+String(today.getDate())+ String(today.getHours())  + String(today.getMinutes()) + String(today.getSeconds()) ;
      
      this.setState(
        {
          image_name:  time
        }
      )


      // Note state setting has high latency as geting time etc takes time
      // Hence using var as a reference
      
      // Upload image

      const uploadTask = storage.ref(`images/${time}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // Error function ...
          console.log(error);
        },
        ()=>
        {
          storage
          .ref("images")
          .child(this.state.image_name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          })
          .then(console.log("this is to be sent:",this.state.image_name))
          alert("Image Uploaded: "+this.state.image_name)
         
        }
     
        )
          
    };




    onChangeName (e) {
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

          storage
            .ref("images")
            .child(this.state.image_name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
            }).then(
              ()=>{
                const product = {
                  name: this.state.name,
                  description: this.state.description,
                  price: this.state.price,
                  available_quantity: this.state.available_quantity,
                  date_produced: this.state.date,
                  life: this.state.life,
                  image:this.state.url
                }
            
                console.log(product);
            
                axios.post('http://localhost:5000/stock-product/add', product)
                .then(res => console.log(res.data))
                .then(alert("Done"))
                .then(window.location.reload())
              }
            )
          
        }
     
        
    
    
    render(){

     
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                
                <h3 style={{marginTop:"20px"}}>Add Grocery Product</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name : </label>
                    <input style={{paddingLeft:"10px",borderRadius:"10px"}}
                        type="text" 
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                    <label>Description : </label>
                    <input style={{paddingLeft:"10px",borderRadius:"10px"}}
                        type="text" 
                        className="form-control"
                      
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Price (in ₹):</label>
                    <input style={{paddingLeft:"10px",borderRadius:"10px"}}
                        type="text" 
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                    <label>Quantity (in Kg)</label>
                    <input style={{paddingLeft:"10px",borderRadius:"10px"}}
                        type="number" 
                        min="1"
                        className="form-control"
                        value={this.state.available_quantity}
                        onChange={this.onChangeQuantity}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div style={{paddingLeft:"10px",borderRadius:"10px"}}>
                        <DatePicker 
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>
                    
                    
                    <div className="form-group" >
                    <label>Life (in days):</label>
                    <input style={{paddingLeft:"10px",borderRadius:"10px"}}
                        type="text" 
                        className="form-control"
                        value={this.state.life}
                        onChange={this.onChangeLife}
                        />
                    </div>

                        


                      <div>
                        <button className="card_button-red" onClick={this.onSubmit}> 
                          <Link style= {{textDecoration: "none" ,color:"white"}} to="/product">Add Product</Link>
                        </button>
                      </div>
                </form>
                </div>
            </div>
        )
        
    }
}
