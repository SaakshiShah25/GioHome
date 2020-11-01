import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { FaDivide } from 'react-icons/fa';

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
            
           <form>
            <div className="radio">
              <label >
                <input type="radio"  name= "payment" value="cod" defaultValue={values.payment}  onChange={handleChange}/>
                  Cash on Delivery
              </label>
              <label>
                <input type="radio"  name= "payment"  value="card" defaultValue={values.payment}  onChange={handleChange}/>
                  Credit/Debit
              </label>
            </div>
            <div className="radio">
              <label >
                <input type="radio"  name= "delivery" value="express" defaultValue={values.delivery}  onChange={handleChange}/>
                  Express
              </label>
              <label>
                <input type="radio"  name= "delivery" value="free" defaultValue={values.delivery} onChange={handleChange}/>
                  Free Delivery
              </label>
            </div>
            </form>
         
            <button
             onClick={this.back}
            >Back</button>

            <button
              onClick={this.continue}
            >Continue</button>
           
      

            {/* </div> */}
          </Dialog>
        </>
      </MuiThemeProvider>
    
    );
  }
}

export default FormDeliveryDetails;