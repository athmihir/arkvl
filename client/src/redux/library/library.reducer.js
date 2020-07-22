import TrendingActionTypes from './library.type';

const INITIAL_STATE = [];

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TrendingActionTypes.SUCCESS_FETCH_LIBRARY:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
