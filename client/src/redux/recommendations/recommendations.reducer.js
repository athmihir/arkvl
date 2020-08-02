import RecommendationActionTypes from './recommendations.type';

const INITIAL_STATE = [];

const recommendationReducer = (state = INITIAL_STATE, action) => {
  let delList = [];
  switch (action.type) {
    case RecommendationActionTypes.SUCCESS_FETCH_RECOMMENDATIONS:
      return action.payload;
    case RecommendationActionTypes.REMOVE_RECOMMENDATION:
      delList = state;
      delList = delList.filter((item) => item.id !== action.payload);
      return delList;
    default:
      return state;
  }
};

export default recommendationReducer;
