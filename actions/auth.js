import * as Types from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const registerUser = formData => async dispatch => {
  dispatch({
    type: Types.IS_LOADING,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      'http://localhost:4000/api/users',
      formData,
      config,
    );
    dispatch({
      type: Types.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: Types.IS_NOT_LOADING,
    });
  } catch (err) {
    dispatch({
      type: Types.REGISTER_FAIL,
      payload: err.response.data.msg,
    });
    dispatch({
      type: Types.IS_NOT_LOADING,
    });
  }
};

export const loginUser = formData => async dispatch => {
  dispatch({
    type: Types.IS_LOADING,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      'http://localhost:4000/api/auth',
      formData,
      config,
    );
    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: res.data,
    });
    await loadUser();
    dispatch({
      type: Types.IS_NOT_LOADING,
    });
  } catch (err) {
    dispatch({
      type: Types.LOGIN_FAIL,
      payload: err.response.data.msg,
    });
    dispatch({
      type: Types.IS_NOT_LOADING,
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    const storageResponse = await AsyncStorage.getItem('datespot-token');
    const token = storageResponse;

    const config = {headers: {'x-auth-token': token}};
    const res = await axios.get('http://localhost:4000/api/auth', config);
    dispatch({
      type: Types.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.AUTH_ERROR,
      payload: err,
    });
  }
};
