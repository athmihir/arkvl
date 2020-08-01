import React, { Component } from 'react';
import './ResetPassword.styles.css';
import { toast, Slide } from 'react-toastify';
import SubmitButton from '../../components/CustomButton/CustomButton';
import InputField from '../../components/InputField/InputField';
import axios from 'axios';
import { navigate } from '@reach/router';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: undefined,
      token: this.props.token,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.password === this.state.confirmPassword) {
      axios
        .post(`/api/verifyreset`, {
          token: this.state.token,
          password: this.state.password,
        })
        .then((res) => {
          console.log('here is the API response from api/verifyreset');
          console.log(res);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.error || 'Something went wrong', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        });
    } else {
      toast.error(`Passwords don't match`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };

  render() {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h2 style={{ marginBottom: '10px' }}>Enter your new password</h2>
          <form onSubmit={this.handleSubmit}>
            <InputField
              name="password"
              type="password"
              placeholder=" "
              label="New password"
              onChange={this.handleChange}
            />
            <InputField
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder=" "
              onChange={this.handleChange}
            />
            <SubmitButton
              className="submitButton"
              type="submit"
              onClick={this.handleSubmit}
            >
              Reset password
            </SubmitButton>
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
