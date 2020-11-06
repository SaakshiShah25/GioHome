import React, { Component } from 'react';
import FormCustomerDetails from './FormCustomerDetails';
import FormDeliveryDetails from './FormDeliveryDetails';
import Confirm from './Confirm';
import Success from './Success';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

export class CustomerDetails extends Component {
  state = {
    step: 1,
    address:'',
    delivery:'',
    payment:'',
    net_amount: '',
    products:[]
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = e => {
    this.setState({
          [e.target.name]: e.target.value
    });
    }

    componentDidMount()
    {
      const obj = getFromStorage('email');
      this.setState(
        {
        products:this.props.location.data.products,
        net_amount: this.props.location.data.net_amount,
        farmer_email:this.props.location.data.farmer_email
        
        }
      )
    }
  render() {
    const { step } = this.state;
    const { address,delivery,payment, products,net_amount,farmer_email} = this.state;
    const values = { address,delivery,payment,products,net_amount,farmer_email };

    switch (step) {
      case 1:
        return (
          <FormCustomerDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormDeliveryDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default CustomerDetails;