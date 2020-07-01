import axios from 'axios';
import UserActionTypes from './user.types';

export const loginUser = (userData) => {
  return (dispatch) => {
    axios
      .post('/login', userData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchUsersSuccess());
        }
      })
      .catch((err) => console.log(err));
  };
};

const fetchUsersSuccess = () => ({
  type: UserActionTypes.SUCCESS_LOGIN,
});


export const registerUser = (userData) => {
  return (dispatch) => {
    axios
      .post('/register', userData)
      .then((res) => {
        if (res.status === 201) {
          dispatch(fetchUsersSuccessRegister());
        }
      })
      .catch((err) => console.log(err));
  };
};

const fetchUsersSuccessRegister = () => ({
  type: UserActionTypes.SUCCESS_REGISTER
});