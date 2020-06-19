import mockAxios from 'axios';
import * as Types from './types';
import AsyncStorage from '@react-native-community/async-storage';
jest.mock('axios');

import {getSpots} from './spots';

describe('spot actions', () => {
  let dispatch;
  beforeEach(() => {
    jest.clearAllMocks();
    dispatch = jest.fn();
  });
  test('getSpots function dispatches to GET_SPOTS', async () => {
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
});
