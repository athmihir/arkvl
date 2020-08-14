import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import './RegisterForm.styles.css';
import { registerUser } from '../../redux/user/user.actions';
import { toast, Slide } from 'react-toastify';
import { connect } from 'react-redux';

const RegisterForm = ({ registerUserSubmit }) => {
  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validInput = handleValidation();
    if (validInput) {
      registerUserSubmit(registerInfo);
    } else {
      if (errors.length > 0) {
        errors.map((err) =>
          toast.error(err, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          }),
        );
      }
    }
  };

  const handleValidation = () => {
    let errors = [];
    let formIsValid = true;

    //Name
    if (!registerInfo['username']) {
      formIsValid = false;
      errors.push('Username cannot be empty');
    }

    //Email
    if (!registerInfo['email']) {
      formIsValid = false;
      errors.push('Email cannot be empty');
    }

    if (typeof registerInfo['email'] !== 'undefined') {
      let lastAtPos = registerInfo['email'].lastIndexOf('@');
      let lastDotPos = registerInfo['email'].lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          registerInfo['email'].indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          registerInfo['email'].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.push('Email is not valid');
      }
    }

    if (!registerInfo['password']) {
      formIsValid = false;
      errors.push('Password cannot be empty');
    }

    setErrors(errors);
    return formIsValid;
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
            value={registerInfo.username}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder=" "
            onChange={handleChange}
            value={registerInfo.email}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder=" "
            onChange={handleChange}
            value={registerInfo.password}
          />
          <SubmitButton type="submit" onClick={handleSubmit}>
            Register
          </SubmitButton>
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
