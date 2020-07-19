import axios from 'axios';
import TrendingActionTypes from './library.type';

export const RemoveRatedBook = (id) => ({
  type: TrendingActionTypes.REMOVE_TRENDING,
  payload: id,
});

const TrendingBookAction = (data) => ({
  type: TrendingActionTypes.SUCCESS_FETCH_TRENDING,
  payload: data,
});

export const FetchTrendingBooks = () => (dispatch) => {
  axios
    .get('/api/trending')
    .then((res) => {
      dispatch(TrendingBookAction(res.data.trending));
    })
    .catch((err) => {
      console.log(err);
    });
};
