import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
// **Firebase imports **
import firebase from "firebase/app";
import "firebase/storage";
// *********************
import Background from './fruit1.jpg';
import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class Landing extends Component{

    constructor(props){
        super(props);

        this.state = {
            
            image: "https://firebasestorage.googleapis.com/v0/b/gio-home-caf53.appspot.com/o/images%2Fpoor%20dad%20crop.jpg?alt=media&token=3bc64cd1-4961-4107-9551-4bdda0bc124e",
            
        }
    }
    componentDidMount()
    {
        setInStorage("type","")
        
    }

    render(){
        return(
            
            <div style={{backgroundImage: `url(${Background})`
            
            , backgroundRepeat:"no-repeat",
            backgroundPositionX:"center",
            backgroundPositionY:"center",
            backgroundSize:"cover"

            
            }}>
            
            {/* <h1 style={{marginTop:'20px',textAlign:'center'}}>Welcome ! सुस्वागतम ! Bienvenue !</h1> */}
            
            {/* <h4 style={{marginTop:'20px',textAlign:'center'}}> A ONE-STOP SHOP FOR 100% FARM-FRESH PRODUCTS</h4> */}
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"70px"}}>
            <FaIcons.FaCarrot className='menu-bars' style={{fontSize:"70px"}}/>

                          <div style={{fontSize:"70px",fontWeight:"bold"}}>  Farmer's Mart</div>
          </div>
            <div className="landing-container">
                
            
                <button className='landing-button' onClick={()=>setInStorage("type","Customer")}>
                    <Link style={{textDecoration:'none',color:'#3ab54a', fontFamily:'Open Sans',fontSize:'40px',fontWeight:'bolder'}} to="/customer-signup">Customer</Link>
                </button>
                <button className='landing-button' onClick={()=>setInStorage("type","Farmer")} >
                    <Link style={{textDecoration:'none',color:' #3ab54a',fontFamily:'Open Sans',fontSize:'40px',fontWeight:'bolder'}} to="/farmer-signup">Farmer</Link>
                </button>
                {/* <img src ={this.state.image ||"https://via.placeholder.com/400x300"}
                alt = "Upload Images"
                height="300"
                width = "400"

                
                /> */}
            </div>
            <div className='col-md-3' style={{height:"100px"}}></div>
            </div>
        )
    }
}