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
  it('changes state on get spots action', () => {
    const action = {
      type: Types.GET_SPOTS,
      payload: 'some sort of spots',
    };
    const expectedState = {
      spots: action.payload,
    };

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
});
