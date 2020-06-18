import spotReducer from './spotReducer';
import * as Types from '../actions/types';

describe('spotReducer', () => {
  it('returns default state if non related action is passed', () => {
    const unrelatedAction = {
      type: 'unrelatedAction',
    };

    const dummyState = {
      random: 'state',
    };

    expect(spotReducer(dummyState, unrelatedAction)).toEqual(dummyState);
  });
});
