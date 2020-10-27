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
            <div>hello</div> 
            <div onChange={handleChange}>
            <label for="delivery">Delivery Type</label>
            <input type="radio" name="delivery" value="express" defaultValue={values.delivery}>Express Delivery</input>
            <input type="radio" name="delivery" value="free" defaultValue={values.delivery}>Free Delivery </input>
            </div> 

            <div onChange={handleChange}>
            <label for="payment">Payment Mode</label>
            <input type="radio" name="payment" value="express" defaultValue={values.payment}>Cash on Delivery</input>
            <input type="radio" name="payment" value="free" defaultValue={values.payment}>Credit Card</input>
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