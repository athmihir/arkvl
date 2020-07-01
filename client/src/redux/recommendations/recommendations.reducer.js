import RecommendationActionTypes from './recommendations.type';

const INITIAL_STATE = {};

const recommendationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecommendationActionTypes.SUCCESS_FETCH_RECOMMENDATIONS:
      return state;
    default:
      return state;
  }
};

export default recommendationReducer;
