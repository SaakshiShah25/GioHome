import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormDeliveryDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

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

            <div>
            <label for="delivery">Delivery Type</label>
            <input type="radio" name="delivery" value="express" defaultValue={values.delivery}>Express Delivery</input>
            <input type="radio" name="delivery" value="free" defaultValue={values.delivery}>Free Delivery </input>
            <label for="payment">Payment Mode</label>
            <input type="radio" name="payment" value="express" defaultValue={values.payment}>Cash on Delivery</input>
            <input type="radio" name="payment" value="free" defaultValue={values.payment}>Credit Card</input>
            </div>
           
            

            <button
             onClick={this.back}
            >Back</button>

            <button
              onClick={this.continue}
            >Continue</button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormDeliveryDetails;