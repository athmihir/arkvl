import axios from 'axios';
import TrendingActionTypes from './trending.type';

export const FetchTrendingBooks = () => (dispatch) => {
  axios
    .get('/Trending')
    .then((res) => {
      dispatch(TrendingBookAction(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const RemoveRatedBook = (id) => ({
  type: TrendingActionTypes.REMOVE_TRENDING,
  payload: id,
});

const TrendingBookAction = (data) => ({
  type: TrendingActionTypes.SUCCESS_FETCH_TRENDING,
  payload: data,
});
