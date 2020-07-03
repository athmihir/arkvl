import axios from 'axios';
import TrendingActionTypes from './trending.type';

export const FetchTrendingBooks = () => (dispatch) => {
  axios
    .get('/trending')
    .then((res) => {
      console.log(typeof res.data);
      dispatch(TrendingBookAction(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const TrendingBookAction = (data) => ({
  type: TrendingActionTypes.SUCCESS_FETCH_TRENDING,
  payload: data,
});
