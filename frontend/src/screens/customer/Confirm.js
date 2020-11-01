import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

export class Confirm extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  
  componentDidMount()
  {
      const obj = getFromStorage('email');
      const id =  obj
      var data = this.props.values;
      data['email'] = id
      
      axios.post("http://localhost:5000/orders/confirm",data)
      .then(res => console.log(res))
      // Append this data to the order object
      
  }

  render() {
    let i = 0;
    const {
      values: { address,delivery,payment,net_amount,products }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <h3>Confirm User Data</h3>
            {/* Also display all the products here in inshort */}
            <List>
              <ListItem>
                <ListItemText primary="Address" secondary={address} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Delivery Type" secondary={delivery} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Mode of Payment" secondary={payment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Net Amount" secondary={net_amount} />
              </ListItem>
              
              {
              products.map(
                
                product => 
                { 
                  i  = i + 1
                  return(
                    <ListItem>
                      <ListItemText primary="Sr. No." secondary={i} />
                      <ListItemText primary="Name" secondary={product.name} />
                      <ListItemText primary="Price" secondary={product.price} />
                      <ListItemText primary="Quantity" secondary={product.available_quantity} />
                    </ListItem>
                  )
                }
                
                
              )
              }
            </List>
            <br />

            <button
              onClick={this.back}
            >Back</button>

            <button
              onClick={this.continue}
            > Confirm & Continue </button>
            
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;