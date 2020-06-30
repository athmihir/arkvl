import { combineReducers } from 'redux';
import recommendationsReducer from './recommendations/recommendations.reducer';

const rootReducer = combineReducers({
  recommendations: recommendationsReducer,
});

export default persistReducer(persistConfig, rootReducer);
