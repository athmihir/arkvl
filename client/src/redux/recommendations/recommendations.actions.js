import axios from 'axios';
import RecommendationsActionTypes from './recommendations.type';

export const recommendationsUsersSuccess = (res) => {
    console.log("lets log this mfer")
    console.log(res.data);
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

export const fetchRecommendationsUser = () => {
    return (dispatch) => {
        axios.get('/Recommend')
            .then((res) => {
                console.log("SUCCESS NIGGA")
                console.log(res.data);
                dispatch(recommendationsUsersSuccess(res));
            })
            .catch((err) => {
                console.log("Well shit lmao")
                console.log(err.response);
                dispatch(recommendationsUsersFailure(err));
             });
    };
};