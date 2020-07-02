import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './LoginRegister.styles.css';

function LoginRegister({ error }) {
  useEffect(() => {
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
  }, [error]);
  return (
    <div className="login-register-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.user.error,
});

export default connect(mapStateToProps)(LoginRegister);
