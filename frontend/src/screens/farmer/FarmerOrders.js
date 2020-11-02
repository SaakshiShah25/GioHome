import React, {Component,Fragment, version} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'

export default class FarmerOrders extends Component{
    constructor(props){
        super(props);

        this.state={
           farmer_doc:[] 
        }
    }
    
    render(){
        return(
            <div>farmer order !!!!</div>
        )
    }
}