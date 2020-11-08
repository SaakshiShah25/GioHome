import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

export class FormCustomerDetails extends Component {

  constructor(props){

    super(props);
    

    this.state={
        
      address : []
    }

}
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
handleChangeOption = ()=>{
  const { values, handleChange } = this.props;
  handleChange()
  this.continue()
}
  componentDidMount()
  {
    const obj = getFromStorage('email');
    console.log("Email",obj)
    const id =  obj

    // axios.get('http://localhost:5000/account/'+id)
    // .then(res => { this.setState({address:res.data.address})})
  }
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog 
            open
            fullWidth
            maxWidth='sm'
          >
            <div style={{backgroundColor:'#e8f5e9'}}>
            <label for="address"></label>
            <textarea cols="50" name="address" placeholder="Enter Your Address" 
              id="address"
              onChange={handleChange}
              defaultValue={values.address}
            >
            </textarea>
            <br />
            <div>My saved Addresses</div>
            <Dropdown options = {this.state.address} onChange={handleChange} value={""} placeholder="Select an option">

            </Dropdown>
            
            <button className="card_button-green" onClick={this.continue}>
            Continue
            </button>
            </div>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormCustomerDetails;