import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import { loginUser } from '../../redux/user/user.actions';
import './LoginForm.styles.css';
import { connect } from 'react-redux';

const LoginForm = () => {
  const [loginInfo, setloginInfo] = useState({
    username: '',
    password: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setloginInfo({
      [name]: value,
    });
  };
  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1>Log into your account.</h1>
        <form onSubmit={loginUser(loginInfo)}>
          <InputField
            name="username"
            label="Username"
            type="text"
            required
            placeholder=" "
            onChange={handleChange}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            required
            placeholder=" "
            onChange={handleChange}
          />
          <SubmitButton
            onClick={() => {
              loginUser(loginInfo);
            }}
          >
            Login
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser()),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
