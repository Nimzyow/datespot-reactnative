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

export const addToLikeCount = toAdd => async dispatch => {
  console.log('DO WE EVEN GET HERE?');

  const {spotId, userId} = toAdd;
  console.log('SPOTID AND USERID', spotId, userId);

  const toSend = {userId};

  try {
    const storageResponse = await AsyncStorage.getItem('datespot-token');
    const token = storageResponse;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.post(
      `http://localhost:4000/api/spots/${spotId}/like`,
      toSend,
      config,
    );
    dispatch({
      type: Types.ADD_LIKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.LIKES_ERROR,
      payload: err,
    });
  }
};

export const removeFromLikeCount = toRemove => async dispatch => {
  const {spotId, userId} = toRemove;

  const toSend = {userId};
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post(
      `http://localhost:4000/api/spots/${spotId}/likeRemove`,
      toSend,
      config,
    );
    dispatch({
      type: Types.REMOVE_LIKE,
      payload: toRemove,
    });
  } catch (err) {
    dispatch({
      type: Types.LIKES_ERROR,
      payload: err,
    });
  }
};
