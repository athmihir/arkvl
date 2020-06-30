import RecommendationActionTypes from './reccommendations.type';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecommendationActionTypes.SUCCESS_FETCH_RECOMMENDATIONS:
      return state;
    default:
      return state;
  }
};

export default userReducer;
