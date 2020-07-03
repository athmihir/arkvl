import { combineReducers } from 'redux';
import recommendationsReducer from './recommendations/recommendations.reducer';
import userReducer from './user/user.reducer';
import trendingReducer from './trending/trending.reducer';

const rootReducer = combineReducers({
  recommendations: recommendationsReducer,
  user: userReducer,
  trending: trendingReducer,
});

export default rootReducer;
