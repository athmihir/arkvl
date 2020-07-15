import UserActionType from './user.types';

const INITIAL_STATE = {
  isAuthenticated: undefined,
  error: null,
  userName: '',
  newUser: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.SUCCESS_REGISTER:
      return {
        error: null,
        isAuthenticated: true,
        userName: action.payload,
        newUser: true,
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
    case UserActionType.UNSET_ERROR:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;
