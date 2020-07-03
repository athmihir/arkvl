import axios from 'axios';
export const FetchTrendingBooks = () => (dispatch) => {
  axios
    .get('/trending')
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
