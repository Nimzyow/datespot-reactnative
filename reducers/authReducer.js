import AsyncStorage from '@react-native-community/async-storage';
import * as types from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case types.LOGIN_SUCCESS:
      AsyncStorage.setItem('datespot-token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case types.AUTH_ERROR:
      AsyncStorage.removeItem('datespot-token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.IS_NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
