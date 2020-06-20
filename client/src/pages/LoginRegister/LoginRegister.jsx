import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './LoginRegister.styles.css';
export default function LoginRegister() {
  return (
    <div className="login-register-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
