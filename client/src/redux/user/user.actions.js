import axios from 'axios';
import UserActionTypes from './user.types';

export const checkUserStatus = () => async (dispatch) => {
  axios
    .get('/login')
    .then((res) => {
      if (res.data.logged_in) {
        dispatch(loginUsersSuccess(res.data.Username));
      }
    })
    .catch((err) => {});
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(
      '/login',
      { username: userData.username, password: userData.password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      console.log(res.data);
      dispatch(loginUsersSuccess(res.data.Username));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(
        loginError(
          err.response.data
            ? err.response.data.message
            : 'Something went wrong',
        ),
      );
    });
};

export const registerUser = (userData) => (dispatch) => {
  console.log(userData);
  axios
    .post('/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      console.log(res.data);
      dispatch(registerUserSuccess(res.data.Username));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(
        registerError(
          err.response.data
            ? err.response.data.message
            : 'Something went wrong',
        ),
      );
    });
};

export const registerUserSuccess = (username) => ({
  type: UserActionTypes.SUCCESS_REGISTER,
  payload: username,
});

export const loginUsersSuccess = (username) => {
  return {
    type: UserActionTypes.SUCCESS_LOGIN,
    payload: username,
  };
};

const loginError = (err) => ({
  type: UserActionTypes.ERROR_LOGIN,
  payload: err,
});

const registerError = (err) => ({
  type: UserActionTypes.ERROR_REGISTER,
  payload: err,
});
