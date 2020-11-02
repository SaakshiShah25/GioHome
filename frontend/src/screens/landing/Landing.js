import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

export default class Landing extends Component{
    render(){
        return(
            <div>
                <button>
                    <Link to="/">Customer</Link>
                </button>
                <button>
                    <Link to="/farmer-home">Farmer</Link>
                </button>
            </div>
        )
    }
}