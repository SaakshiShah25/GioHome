import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Success" />
            <div style={{backgroundColor:'#e8f5e9'}}>
            <h1 style={{textAlign:"center"}}>Thank You For Your Submission</h1>
            <p style={{textAlign:"center",fontWeight:'bolder'}}>You will get an email with further instructions.</p>
            <p style={{textAlign:"center",fontWeight:'bolder'}}>This is your order summary</p>
            <div style={{display:'flex',justifyContent:'center'}}>
            <button className='other-button'>
              <Link style={{textDecoration:'none',color:'whitesmoke'}} to="/customer">
              Go to Home Page
              </Link>
            </button>
            </div></div>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;