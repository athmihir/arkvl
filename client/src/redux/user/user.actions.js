import axios from 'axios';
import UserActionTypes from './user.types';

export const checkUserStatus = () => (dispatch) => {
  axios
    .get('/login')
    .then((res) => {
      if (res.data.logged_in) {
        dispatch(loginUsersSuccess());
      }
    })
    .catch((err) => {});
};

export const loginUser = (userData) => (dispatch) => {
  console.log(userData);
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
      dispatch(loginUsersSuccess());
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
      dispatch(registerUserSuccess());
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

export const registerUserSuccess = () => ({
  type: UserActionTypes.SUCCESS_REGISTER,
});

export const loginUsersSuccess = () => {
  return {
    type: UserActionTypes.SUCCESS_LOGIN,
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
