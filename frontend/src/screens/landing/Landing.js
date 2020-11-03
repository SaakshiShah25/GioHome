import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

export default class Landing extends Component{

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
            </div>
        )
    }
}