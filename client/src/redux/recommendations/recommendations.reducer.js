import RecommendationActionTypes from './recommendations.type';

const INITIAL_STATE = [];

const recommendationReducer = (state = INITIAL_STATE, action) => {
  let delList = [];
  let editList = [];
  switch (action.type) {
    case RecommendationActionTypes.SUCCESS_FETCH_RECOMMENDATIONS:
      return action.payload;
    case RecommendationActionTypes.REMOVE_RECOMMENDATION:
      delList = state;
      delList = delList.filter((item) => item.id !== action.payload);
      return delList;
    case RecommendationActionTypes.EDIT_RECOMMENDATION:
      editList = state;
      const index = findIndex(editList, { id: parseInt(action.payload.id) });
      if (index > -1) editList[index].rating = action.payload.rating;
      return editList;
    default:
      return state;
  }
};

export default recommendationReducer;
