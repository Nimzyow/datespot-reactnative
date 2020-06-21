import * as Types from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getSpots = () => async dispatch => {
  try {
    const storageResponse = await AsyncStorage.getItem('datespot-token');
    const token = storageResponse;

    const config = {headers: {'x-auth-token': token}};

    const res = await axios.get('http://localhost:4000/api/spots', config);

    dispatch({
      type: Types.GET_SPOTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.SPOTS_ERROR,
      payload: err,
    });
  }
};

export const filterSpotsBasedOnLike = user => dispatch => {
  dispatch({
    type: Types.FILTER_BY_USER_LIKES,
    payload: user,
  });
};
