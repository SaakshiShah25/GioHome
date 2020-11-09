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
             <div>
            <div className="radio" style={{marginLeft:"20px"}}>
            <label>  Cash on Delivery 
                <input type="radio"  name= "payment" value="cod" defaultValue={values.payment}  onChange={handleChange}/>
                
                </label>
                <label> Credit Card/Debit Card 
                <input type="radio"  name= "payment"  value="card" defaultValue={values.payment}  onChange={handleChange}/>
          
                </label>
            </div>
            <div className="radio" style={{marginLeft:"20px"}}>
              <label >
                <input type="radio"  name= "delivery" value="express" defaultValue={values.delivery}  onChange={handleChange}/>
                  Express
              </label>
              <label>
                <input type="radio"  name= "delivery" value="free" defaultValue={values.delivery} onChange={handleChange}/>
                  Free Delivery
              </label>
            </div>
            </div>
            </form>

            <div style={{backgroundColor:'#e8f5e9'}}>
            <button className='card_button-red'
             onClick={this.back}
            >Back</button>

            <button className='card_button-green'
              onClick={this.continue}
            >Continue</button>
            </div>
           
      

           
          </Dialog>
        </>
      </MuiThemeProvider>
    
    );
  }
}

export default FormDeliveryDetails;