import {combineReducers} from 'redux';
import authReducer from './authReducer';
import spotReducer from './spotReducer';

export default combineReducers({
  auth: authReducer,
  spot: spotsReducer,
});
