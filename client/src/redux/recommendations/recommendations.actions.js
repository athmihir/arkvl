import axios from 'axios';
import RecommendationsActionTypes from './recommendations.type';

export const recommendationsUsersSuccess = (res) => ({
  type: RecommendationsActionTypes.SUCCESS_FETCH_RECOMMENDATIONS,
  payload: res.data.Recommendations,
});

export const recommendationsUsersFailure = (err) => ({
  type: RecommendationsActionTypes.FAILURE_FETCH_RECOMMENDATIONS,
  payload: err,
});

export const RemoveRatedBook = (id) => ({
  type: RecommendationsActionTypes.REMOVE_RECOMMENDATION,
  payload: id,
});

export const fetchRecommendationsUser = () => (dispatch) => {
  axios
    .get('/api/recommend')
    .then((res) => {
      dispatch(recommendationsUsersSuccess(res));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(recommendationsUsersFailure(err));
    });
};
