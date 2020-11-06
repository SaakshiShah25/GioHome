import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
// **Firebase imports **
import firebase from "firebase/app";
import "firebase/storage";
// *********************

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
            <div>
                <button onClick={()=>setInStorage("type","Customer")}>
                    <Link to="/customer-signup">Customer</Link>
                </button>
                <button onClick={()=>setInStorage("type","Farmer")} >
                    <Link to="/farmer-signup">Farmer</Link>
                </button>
                <img src ={this.state.image ||"https://via.placeholder.com/400x300"}
                alt = "Upload Images"
                height="300"
                width = "400"

                
                />
            </div>
        )
    }
}