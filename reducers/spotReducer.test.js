import spotReducer from './spotReducer';
import * as Types from '../actions/types';

describe('spotReducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {
      spots: null,
      error: null,
    };
    expectedState = {...initialState};
  });
  it('returns default state if non related action is passed', () => {
    const unrelatedAction = {
      type: 'unrelatedAction',
    };

    const dummyState = {
      random: 'state',
    };

    expect(spotReducer(dummyState, unrelatedAction)).toEqual(dummyState);
  });
  it('changes state on GET_SPOTS action', () => {
    const action = {
      type: Types.GET_SPOTS,
      payload: 'some sort of spots',
    };
    expectedState.spots = action.payload;

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
  it('changes state on SPOTS_ERROR', () => {
    const action = {
      type: Types.SPOTS_ERROR,
      payload: {err: 'some error'},
    };
    const expectedState = {
      spots: null,
      error: action.payload,
    };

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
});
