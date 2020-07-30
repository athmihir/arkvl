import React, { Component } from 'react';
import './ForgotPassword.styles.css';
import Unlock from './unlock.svg';
import SubmitButton from '../../components/CustomButton/CustomButton';
import Lock from './lock.svg';
import InputField from '../../components/InputField/InputField';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lock: false,
      email: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      lock: true,
    });
    axios
      .post(`/api/reset_password`, { email: this.state.email })
      .then((res) => {
        console.log('here is the API response');
        console.log(res);
      })
      .catch((err) => {
        console.log('no cap');
        console.log(err.response);
      });
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div className="forgot-password-container">
        {this.state.lock ? (
          <img className="lockUnlock" src={Lock} alt="Lock" />
        ) : (
          <img className="lockUnlock" src={Unlock} alt="Unlock" />
        )}
        {this.state.lock ? (
          <h2>We've sent you a link to reset your password.</h2>
        ) : (
          <div>
            <h1 className="forgotPasswordHeading">
              Forgot your password? No problem!
            </h1>
            <p>Enter your email ID and we'll send you a password reset link.</p>
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              className="inputEmailField"
              style={{
                display: 'flex',
                width: '30vh',
                margin: 'auto',
              }}
              onChange={this.handleChange}
            />
            <SubmitButton
              className="submitButton"
              type="submit"
              onClick={this.handleSubmit}
              style={{
                display: 'flex',
                width: '10%',
                margin: 'auto',
                'margin-top': '20px',
              }}
            >
              Submit
            </SubmitButton>
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
