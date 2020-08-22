import React, {Component} from 'react';
import axios from 'axios';
// import findUser from '../../../../backend/models/farmer/farmer.model'

export default class Farmer extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }

    render(){
        return("Farmer's Page");
    }
}
