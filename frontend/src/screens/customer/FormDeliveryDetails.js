import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

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
            <div onChange={handleChange}>
            <label for="delivery">Delivery Type</label>
            <input type="radio" name="delivery" value="express">Express Delivery</input>
            <input type="radio" name="delivery" value="free">Free Delivery </input>
            </div> 

            <div onChange={handleChange}>
            <label for="payment">Payment Mode</label>
            <input type="radio" name="payment" value="express">Cash on Delivery</input>
            <input type="radio" name="payment" value="free">Credit Card</input>
            </div> 
            
            <br />
            
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