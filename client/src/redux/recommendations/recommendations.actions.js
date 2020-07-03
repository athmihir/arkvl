import axios from 'axios';
import RecommendationsActionTypes from './recommendations.type';

export const recommendationsUsersSuccess = (res) => {
    return {
      type: RecommendationsActionTypes.SUCCESS_FETCH_RECOMMENDATIONS,
      payload: res.data.recs,
    };
};

export const recommendationsUsersFailure = (err) => {
    return {
      type: RecommendationsActionTypes.FAILURE_FETCH_RECOMMENDATIONS,
      payload: err,
    };
};

export const fetchRecommendationsUser = () => {
    return (dispatch) => {
        axios.get('/Recommend')
            .then((res) => {
                console.log(res.data);
                dispatch(res.data.recs);
            })
            .catch((err) => {
                console.log("Well shit lmao")
                console.log(err.response);
                dispatch(recommendationsUsersFailure(
                    err.response.data
                    ? err.response.data.message
                    : 'Recommendations couldn\'t be fetched.'
                ));
             });
    };
};