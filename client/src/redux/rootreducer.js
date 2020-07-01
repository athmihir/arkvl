import { combineReducers } from 'redux';
import recommendationsReducer from './recommendations/recommendations.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  recommendations: recommendationsReducer,
  user: userReducer,
});

export default rootReducer;
