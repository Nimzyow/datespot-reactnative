import mockAxios from 'axios';
import * as Types from './types';
import AsyncStorage from '@react-native-community/async-storage';
jest.mock('axios');

import {
  getSpots,
  filterSpotsBasedOnLike,
  addToLikeCount,
  removeFromLikeCount,
} from './spots';

describe('spot actions', () => {
  let dispatch;
  beforeEach(() => {
    jest.clearAllMocks();
    dispatch = jest.fn();
  });
  test('getSpots function dispatches to GET_SPOTS', async () => {
    const defaultToken = 'defaultToken';

    AsyncStorage.setItem('datespot-token', defaultToken);

    mockAxios.get.mockImplementationOnce(async () =>
      Promise.resolve({data: {spots: {title: 'someSpot'}}}),
    );
    const response = await getSpots();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.GET_SPOTS,
      payload: {spots: {title: 'someSpot'}},
    });
    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:4000/api/spots',
      {
        headers: {'x-auth-token': defaultToken},
      },
    );
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  test('getSpots function dispatches to SPOTS_ERROR', async () => {
    mockAxios.get.mockImplementationOnce(async () =>
      Promise.reject({err: 'this is an error'}),
    );
    const response = await getSpots();
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.SPOTS_ERROR,
      payload: {err: 'this is an error'},
    });
  });
  test('filterSpotsBasedOnLike function dispatches to FILTER_BY_USER_LIKES', async () => {
    const user = {
      user: {_id: 'userId'},
    };
    const response = await filterSpotsBasedOnLike(user);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.FILTER_BY_USER_LIKES,
      payload: user,
    });
  });
  test('addToLikeCount function dispatches to ADD_TO_LIKE_TABLE', async () => {
    const defaultToken = 'defaultToken';

    AsyncStorage.setItem('datespot-token', defaultToken);

    mockAxios.post.mockImplementationOnce(
      async () => await Promise.resolve({data: 'some likes'}),
    );
    const toAdd = {
      spotId: 'spotId',
      userId: {_id: 'user_id'},
    };
    const toSend = {
      userId: toAdd.userId,
    };
    const response = await addToLikeCount(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.ADD_LIKE,
      payload: 'some likes',
    });
    expect(mockAxios.post).toHaveBeenCalledWith(
      `http://localhost:4000/api/spots/${toAdd.spotId}/like`,
      toSend,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': defaultToken,
        },
      },
    );
  });
  test('removeFromLikeCount function dispatches to REMOVE_LIKE', async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.resolve({data: 'some likes'}),
    );
    const toRemove = {
      spotId: 'spotId',
      userId: {_id: 'user_id'},
    };
    const toSend = {
      userId: toRemove.userId,
    };
    const response = await removeFromLikeCount(toRemove);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.REMOVE_LIKE,
      payload: toRemove,
    });
    expect(mockAxios.post).toHaveBeenCalledWith(
      `http://localhost:4000/api/spots/${toRemove.spotId}/likeRemove`,
      toSend,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
  test('removeFromLikeCount function failure dispatches to LIKES_ERROR', async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.reject({err: {msg: 'some error'}}),
    );
    const toAdd = {
      spotId: 'spotId',
      userId: {_id: 'user_id'},
    };
    const response = await removeFromLikeCount(toAdd);
    await response(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: Types.LIKES_ERROR,
      payload: {err: {msg: 'some error'}},
    });
  });
});
