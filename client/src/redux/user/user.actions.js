import axios from 'axios';
import UserActionTypes from './user.types';
import { navigate } from '@reach/router';

export const registerUserSuccess = (username) => ({
  type: UserActionTypes.SUCCESS_REGISTER,
  payload: username,
});

export const loginUsersSuccess = (username) => ({
  type: UserActionTypes.SUCCESS_LOGIN,
  payload: username,
});

const loginError = (err) => ({
  type: UserActionTypes.ERROR_LOGIN,
  payload: err,
});

const registerError = (err) => ({
  type: UserActionTypes.ERROR_REGISTER,
  payload: err,
});

export const unsetError = () => ({
  type: UserActionTypes.UNSET_ERROR,
});

export const userError = () => ({
  type: UserActionTypes.NO_USER,
});

export const checkUserStatus = () => async (dispatch) => {
  axios
    .get('/api/login')
    .then((res) => {
      if (res.data.logged_in) {
        dispatch(loginUsersSuccess(res.data.Username));
      }
    })
    .catch((err) => {
      dispatch(userError());
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(
      '/api/login',
      { username: userData.username, password: userData.password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      dispatch(loginUsersSuccess(res.data.Username));
      navigate('/app');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(
        loginError(
          err.response.data
            ? err.response.data.message || err.response.data.error
            : 'Something went wrong',
        ),
      );
    });
};

export const registerUser = (userData) => (dispatch) => {
  axios
    .post('/api/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      dispatch(registerUserSuccess(res.data.Username));
      navigate('/app');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(
        registerError(
          err.response.data
            ? err.response.data.message || err.response.data.error
            : 'Something went wrong',
        ),
      );
    });
};
