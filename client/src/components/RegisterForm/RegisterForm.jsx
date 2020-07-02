import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import './RegisterForm.styles.css';
import { registerUser } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const RegisterForm = ({ registerUserSubmit }) => {
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
    console.log(registerInfo);
    registerUserSubmit(registerInfo);
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

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserSubmit: (userInfo) => dispatch(registerUser(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
