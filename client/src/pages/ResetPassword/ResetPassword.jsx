import React, { Component } from 'react';
import './ResetPassword.styles.css';
import { toast, Slide } from 'react-toastify';
import SubmitButton from '../../components/CustomButton/CustomButton';
import InputField from '../../components/InputField/InputField';
import axios from 'axios';
import { navigate } from '@reach/router';
import Modal from '../../components/Modal/Modal';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: undefined,
      token: this.props.token
        ? this.props.token.includes('.')
          ? this.props.token
          : 'nochange'
        : false,
      modalIsOpen: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      axios
        .post(`/api/verifyreset`, {
          token: this.state.token,
          password: this.state.password,
        })
        .then((res) => {
          navigate('/app');
        })
        .catch((err) => {
          console.log(err.response);
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

  componentDidMount() {
    if (this.state.token) {
      if (this.state.token.includes('nochange')) {
        this.setState({
          modalIsOpen: true,
        });
        document.getElementsByClassName(
          'reset-password-container',
        )[0].style.filter = 'blur(8px)';
      }
    }
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
    document
      .getElementsByClassName('reset-password-container')[0]
      .style.removeProperty('filter');
    navigate('/forgot-password');
  };

  render() {
    return (
      <div className="reset-password-page">
        <Modal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          verifymodal={false}
          noverifymodal={false}
          tokenexpiremodal={true}
        />
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
