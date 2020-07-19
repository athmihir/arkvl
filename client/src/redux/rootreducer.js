import { combineReducers } from 'redux';
import recommendationsReducer from './recommendations/recommendations.reducer';
import userReducer from './user/user.reducer';
import libraryReducer from './library/library.reducer';

const appReducer = combineReducers({
  recommendations: recommendationsReducer,
  user: userReducer,
  library: libraryReducer,
});

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
