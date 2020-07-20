import axios from 'axios';
import LibraryActionTypes from './library.type';

export const RemoveRatedBook = (id) => ({
  type: LibraryActionTypes.REMOVE_LIBRARY,
  payload: id,
});

const TrendingBookAction = (data) => ({
  type: LibraryActionTypes.SUCCESS_FETCH_LIBRARY,
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
