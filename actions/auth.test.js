import {registerUser, loginUser, loadUser} from './auth';
import mockAxios from 'axios';
import * as Types from './types';
import AsyncStorage from '@react-native-community/async-storage';
jest.mock('axios');

const handleError = err => {
  console.log('err, ', err);
  expect(true).toBe(false);
};

describe('authActions', () => {
  let dispatch = jest.fn();
  let user;
  beforeEach(() => {
    jest.clearAllMocks();
    user = {username: 'testy', email: 'test@test.com', password: '123456'};
  });
  it('REGISTER_SUCCESS is called on succesfull registeration of user', async () => {
    mockAxios.post.mockImplementationOnce(
      async () =>
        await Promise.resolve({
          data: {token: 'greatestTokenInTheUniverse'},
        }),
    );
    try {
      const response = await registerUser(user);

      await response(dispatch);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/users',
        user,
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: Types.REGISTER_SUCCESS,
        payload: {token: 'greatestTokenInTheUniverse'},
      });
    } catch (err) {
      handleError(err);
    }
  });
  it('REGISTER_FAIL is called when email already exists in database', async () => {
    mockAxios.post.mockImplementationOnce(
      async () => await Promise.reject({response: {data: {msg: 'some error'}}}),
    );
    try {
      const response = await registerUser(user);
      await response(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: Types.REGISTER_FAIL,
        payload: 'some error',
      });
    } catch (err) {
      handleError(err);
    }
  });
  it('LOGIN_SUCCESS is called on succesfull login of user', async () => {
    delete user.username;
    mockAxios.post.mockImplementationOnce(
      async () =>
        await Promise.resolve({
          data: {token: 'greatestTokenInTheUniverse'},
        }),
    );
    try {
      const response = await loginUser(user);

      await response(dispatch);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/auth',
        user,
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: Types.LOGIN_SUCCESS,
        payload: {token: 'greatestTokenInTheUniverse'},
      });
    } catch (err) {
      handleError(err);
    }
  });
  it('USER_LOADED is called when token is succesfully read.', async () => {
    const user = {
      _id: 'testId',
    };

    const defaultToken = 'defaultToken';

    AsyncStorage.setItem('datespot-token', defaultToken);

    mockAxios.get.mockImplementationOnce(
      async () => await Promise.resolve({data: user}),
    );

    try {
      const response = await loadUser();

      await response(dispatch);

      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:4000/auth', {
        headers: {'x-auth-token': defaultToken},
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: Types.USER_LOADED,
        payload: user,
      });
    } catch (err) {
      handleError(err);
    }
  });
});
