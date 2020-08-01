import React, { Component } from 'react';
import axios from 'axios';
import { toast, Slide } from 'react-toastify';
import { motion } from 'framer-motion';
import './ForgotPassword.styles.css';
import Unlock from './unlock.svg';
import InputField from '../../components/InputField/InputField';
import SubmitButton from '../../components/CustomButton/CustomButton';
import Lock from './lock.svg';
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

    axios
      .post(`/api/reset_password`, { email: this.state.email })
      .then((res) => {
        console.log('here is the API response');
        console.log(res);
        this.setState({
          lock: true,
        });
      })
      .catch((err) => {
        console.log('no cap');
        console.log(err.response);
        toast.error(
          err.response.data.error || 'Something went wrong. Please try again',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          },
        );
      });
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <motion.div className="forgot-password-container">
        <header />
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
                marginTop: '20px',
              }}
            >
              Submit
            </SubmitButton>
          </div>
        )}
      </motion.div>
    );
  }
}

export default ForgotPassword;
