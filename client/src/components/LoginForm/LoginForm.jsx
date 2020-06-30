import React from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import './LoginForm.styles.css';

const LoginForm = () => (
  <div className="login-form-container">
    <div className="login-form">
      <h1>Log into your account.</h1>
      <form>
        <InputField
          name="email"
          label="Email"
          type="email"
          required
          placeholder=" "
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          required
          placeholder=" "
        />
        <SubmitButton>Login</SubmitButton>
      </form>
    </div>
  </div>
);

export default LoginForm;
