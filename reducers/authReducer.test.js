import authReducer from './authReducer';
import AsyncStorage from '@react-native-community/async-storage';
import * as types from '../actions/types';
describe('authReducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {
      token: null,
      isAuthenticated: false,
      user: null,
      error: null,
    };
    expectedState = {...initialState};
  });
  it('returns state on unrelated action', () => {
    const nonsenseState = {something: 'something'};
    const nonsenseAction = {type: 'nonsense', payload: 'laughable'};
    expect(authReducer(nonsenseState, nonsenseAction)).toBe(nonsenseState);
  });
  it('calls REGISTER_SUCCESS action', () => {
    expectedState.token = 'token';
    expectedState.isAuthenticated = true;

    const action = {
      type: types.REGISTER_SUCCESS,
      payload: expectedState.token,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  it('calls REGISTER_FAIL action', () => {
    initialState.token = 'greatestTokenEver';
    initialState.isAuthenticated = true;

    expectedState.token = null;
    expectedState.isAuthenticated = false;
    expectedState.error = 'this is an error';

    const action = {
      type: types.REGISTER_FAIL,
      payload: expectedState.error,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
  it('calls LOGIN_SUCCESS action', () => {
    expectedState.token = 'token';
    expectedState.isAuthenticated = true;

    const action = {
      type: types.LOGIN_SUCCESS,
      payload: expectedState.token,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
    expect(AsyncStorage.setItem).toBeCalledWith('datespot-token', 'token');
  });
  it('calls USER_LOADED action ', () => {
    initialState.token = 'greatestTokenEver';
    expectedState.token = initialState.token;
    expectedState.isAuthenticated = true;
    expectedState.user = {_id: 'userId'};

    const action = {
      type: types.USER_LOADED,
      payload: expectedState.user,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
  it('calls AUTH_ERROR action', () => {
    AsyncStorage.setItem('datespot-token', 'bogusToken');
    initialState.token = 'bogusToken';
    initialState.user = {_id: 'userId'};

    expectedState.error = 'this is an error';
    expectedState.token = null;
    expectedState.user = null;

    const action = {
      type: types.AUTH_ERROR,
      payload: expectedState.error,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
    expect(AsyncStorage.removeItem).toBeCalledWith('datespot-token');
  });
});
