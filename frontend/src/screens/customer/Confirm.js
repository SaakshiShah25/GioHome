import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { address,delivery,payment }
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
              
            </List>
            <br />

            <button
              onClick={this.back}
            >Back</button>

            <button
              onClick={this.continue}
            >Confirm & Continue</button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;