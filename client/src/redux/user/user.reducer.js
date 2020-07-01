import UserActionType from './user.types';

const INITIAL_STATE = false;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.SUCCESS_LOGIN:
      return true;
    default:
      return state;
  }
};

export default userReducer;
