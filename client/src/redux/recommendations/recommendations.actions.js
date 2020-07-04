import axios from 'axios';
import RecommendationsActionTypes from './recommendations.type';

export const recommendationsUsersSuccess = (res) => {
  return {
    type: RecommendationsActionTypes.SUCCESS_FETCH_RECOMMENDATIONS,
    payload: res.data.Recommendations,
  };
};

export const recommendationsUsersFailure = (err) => {
  return {
    type: RecommendationsActionTypes.FAILURE_FETCH_RECOMMENDATIONS,
    payload: err,
  };
};

export const RemoveRatedBook = (id) => ({
  type: RecommendationsActionTypes.REMOVE_TRENDING,
  payload: id,
});

export const fetchRecommendationsUser = () => {
  return (dispatch) => {
    axios
      .get('/Recommend')
      .then((res) => {
        console.log(res.data);
        dispatch(recommendationsUsersSuccess(res));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(recommendationsUsersFailure(err));
      });
  };
};
