import React from 'react';
import InputField from '../InputField/InputField';
import SubmitButton from '../CustomButton/CustomButton';
import './RegisterForm.styles.css';
const RegisterForm = () => {
  return (
    <div className="register-form-container">
      <div className="register-form">
        <h1>Create your account!</h1>
        <form>
          <InputField name="name" label="Name" type="text" placeholder=" " />
          <InputField name="email" label="Email" type="email" placeholder=" " />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder=" "
          />
          <SubmitButton>Register</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
