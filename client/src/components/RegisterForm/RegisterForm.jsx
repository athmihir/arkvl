import React, {useState} from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import './RegisterForm.styles.css';
import { registerUser } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const RegisterForm = () => {

  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterInfo({
      [name]: value,
    });
  };

  return (
    <div className="register-form-container">
      <div className="register-form">
        <h1>Create your account!</h1>
        <form onSubmit={registerUser(registerInfo)}>
          <InputField name="name" label="Name" type="text" placeholder=" " onChange={handleChange} />
          <InputField name="email" label="Email" type="email" placeholder=" " onChange={handleChange} />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder=" "
            onChange={handleChange}
          />
          <SubmitButton onClick={() => {
            registerUser(registerInfo)
          }}>Register</SubmitButton>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: () => dispatch(registerUser()),
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);