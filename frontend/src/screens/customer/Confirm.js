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
  constructor(props){
    super(props);
   
    this.state={
       data : []
    }
}

  continue = e => {
    const data = this.state.data
    axios.post("http://localhost:5000/orders/confirm",data)
    .then(res => console.log(res))
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
      this.setState(
        {
          data:data
        }
      )
      
      // Append this data to the order object
      
  }

  render() {
    let i = 0;
    const {
      values: { address,delivery,payment,net_amount,products,farmer_email}
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <div style={{backgroundColor:'#e8f5e9'}}>
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
            <div>
            <button className='card_button-red'
              onClick={this.back}
            >Back</button>

            <button className='card_button-green'
              onClick={this.continue}
            > Continue </button>
            <button className='card_button-red'>
              <Link style={{color:'whitesmoke',textDecoration:'none'}} to="/customer" > Cancel Order </Link>
            </button>
            </div>
            </div>
            
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;