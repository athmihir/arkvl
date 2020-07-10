import UserActionType from './user.types';

const INITIAL_STATE = {
  isAuthenticated: undefined,
  error: null,
  userName: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.SUCCESS_REGISTER:
      return {
        error: null,
        isAuthenticated: true,
        userName: action.payload,
      };
    case UserActionType.SUCCESS_LOGIN:
      return {
        error: null,
        isAuthenticated: true,
        userName: action.payload,
      };
    case UserActionType.ERROR_REGISTER:
      return {
        isAuthenticated: false,
        error: action.payload,
      };
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
