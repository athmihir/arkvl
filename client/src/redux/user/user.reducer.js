import UserActionType from './user.types';

const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.SUCCESS_REGISTER:
    case UserActionType.SUCCESS_LOGIN:
      return {
        error: null,
        isAuthenticated: true,
      };
    case UserActionType.ERROR_REGISTER:
    case UserActionType.ERROR_LOGIN:
      return {
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
