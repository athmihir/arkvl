import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import { loginUser } from '../../redux/user/user.actions';
import { toast, Slide } from 'react-toastify';
import { Link } from '@reach/router';
import './LoginForm.styles.css';
import { connect } from 'react-redux';

const LoginForm = ({ submitUserDetails }) => {
  const [loginInfo, setloginInfo] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setloginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      submitUserDetails(loginInfo);
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
    if (!loginInfo['username']) {
      formIsValid = false;
      errors.push('Username cannot be empty');
    }

    if (!loginInfo['password']) {
      formIsValid = false;
      errors.push('Password cannot be empty');
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1>Log in to arkvl.</h1>
        <form onSubmit={handleSubmit} method="POST">
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
          <SubmitButton type="submit" onClick={handleSubmit}>
            Login
          </SubmitButton>
          <div className="forgot-password">
            <Link className="forgotPasswordLink" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submitUserDetails: (userData) => dispatch(loginUser(userData)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
