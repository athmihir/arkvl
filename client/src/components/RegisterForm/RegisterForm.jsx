import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import './RegisterForm.styles.css';
import { registerUser } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const RegisterForm = ({ registerUserSubmit, error }) => {
  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUserSubmit(registerInfo);
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form">
        <h1>Create your account!</h1>
        <form onSubmit={(event) => handleSubmit(event)} method="POST">
          <InputField
            name="username"
            label="Username"
            type="text"
            placeholder=" "
            onChange={handleChange}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder=" "
            onChange={handleChange}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder=" "
            onChange={handleChange}
          />
          <SubmitButton type="submit">Register</SubmitButton>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserSubmit: (userInfo) => dispatch(registerUser(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
