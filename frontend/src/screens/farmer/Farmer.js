import React, {Component,Fragment} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import storage from "../../Firebase/index";
import empty_image from "../../stock_images/empty_image.jpg";



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
        this.handleQtyChange = this.handleQtyChange.bind(this)
        this.handleLifeChange = this.handleLifeChange.bind(this)
        // this.handleUpload = this.handleUpload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state={
            products:[],
            price:'',
            life:'',
            available_quantity: 0,
            showForm: false,
            formdata : {},
            
            image_data: null,

            showImageForm : false,
            image: null,
            url: "",
            progress: 0,
            image_name: ""
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
      handleQtyChange(e){
          this.setState({available_quantity:e.target.value})
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
          life:this.state.life,
          available_quantity:this.state.available_quantity
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
                    <label>Price (in ₹): </label>
                    <input type="text"  onChange={this.handlePriceChange}></input>
                    <label>Available Quantity (in kg): </label>
                    <input type="text"  onChange={this.handleQtyChange}></input>
                    <label>Life (in days): </label>
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
      handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          console.log(image)
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
                console.log("Triggered ->")
                const image_data = {
                  // name: this.state.name,
                  // description: this.state.description,
                  // price: this.state.price,
                  // available_quantity: this.state.available_quantity,
                  // date_produced: this.state.date,
                  // life: this.state.life,
                  image_url:this.state.url,
                  product_name : this.state.formdata.name
                }
                console.log("Correct data captured-> ", image_data)
            
               
            
                axios.post('http://localhost:5000/farmer/product-image', image_data)
                .then(res => console.log(res.data))
                .then(alert("Done"))
                .then(window.location.reload())
              }
            )
          
        }

      showImageForm = () => {
        return (
            <Modal.Dialog>
            <Modal.Header className='model'>
                <Modal.Title>{this.state.formdata.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body className='model'>
                <form onSubmit={this.onSubmit}>
                <div className="center">
                          <br/>
                          <h2 className="green-text">Upload Image</h2>
      
                          <br/>
                          <br/>
                        <div className="row">
                          <progress value={this.state.progress} max="100" className="progress" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="file-field input-field">
                          <div className="btn">
                            <span>File</span>
                            <input type="file" onChange={this.handleChange} />
                              <div>{this.state.image_name}</div>
                          </div>
                          <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                          </div>
                        </div>
                        <button
                          onClick={this.handleUpload}
                          className="waves-effect waves-light btn">
                          Upload
                        </button>
                        <br />
                        <br />
                        <img
                          src={this.state.url || "https://via.placeholder.com/400x300"}
                          alt="Uploaded Images"
                          height="300"
                          width="400"
                        />
                      </div>
                    {/* <button onClick={this.onSubmit}> Submit </button> */}
                    <input className='card_button-green' type="submit" value="Save"></input>
                </form>
            </Modal.Body>

            <Modal.Footer className='model'>
                <button className='card_button-red' variant="secondary" onClick={()=>this.setState({ showImageForm: false })}>Close</button>
                
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
                <div>
                {this.state.products.map((u)=>(
                <Fragment>
                    <div className="col-md-3">
                        <div className="card green lighten-5" style={{width:'18rem','margin-top':'20px'}}>
                            <img className="card-img-top" src={u.image || empty_image}
                            height="200"
                            width="200" s
                             />
                            <div className="card-body">
                                
                                <h5 className="card-title">{u.name}</h5>
                                <p className="card-text">{u.description}</p>
                                <p className="card-text">Stock: {u.available_quantity} kg</p>
                                <p className="card-text">Price: {u.price} ₹</p>
                                <p className="card-text">Life: {u.life} Days</p>

                                {/* <p className="card-text">Updated on: {u.updatedAt}</p> */}
                            
                            
                            <button className="card_button-green" onClick={()=> this.setState({ showForm: true ,formdata: u})}>
                                Update
                            </button>
                            <button className="card_button-red" onClick={()=>this.remove(u.name)}>Stop Offering</button>
                            <button className="card_button-green" onClick={()=> this.setState({ showImageForm: true, formdata : u})}>
                                Update Image
                            </button>
                            
                            
                              
                            
                        </div>
                    </div>
                  </div>
                    
                </Fragment>
                ))}
                {/* Out of fragment but the value triggered from a specific card in the fragment */}
                  {this.state.showForm ? this.showform() : null}
                   {this.state.showImageForm ? this.showImageForm() : null}
            </div>
            </div>
        );
      

    
    
}
}

