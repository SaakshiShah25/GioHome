import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

export class FormCustomerDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
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
            <label for="address"></label>
            <textarea cols="50" name="address" placeholder="Enter Your Address" 
              id="address"
              onChange={handleChange}
              defaultValue={values.address}
            >
            </textarea>
            <br />
            
            <button
              onClick={this.continue}
            >Continue</button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormCustomerDetails;