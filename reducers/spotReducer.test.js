import spotReducer from './spotReducer';
import * as Types from '../actions/types';

describe('spotReducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {
      spots: null,
      error: null,
      filteredByLiked: null,
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

    expectedState.error = action.payload;

    expect(spotReducer(undefined, action)).toEqual(expectedState);
  });
  test('changes state on filtered by user likes', () => {
    const action = {
      type: Types.FILTER_BY_USER_LIKES,
      payload: {_id: 'userId'},
    };
    initialState.spots = [
      {_id: 'oneId', likes: [{userId: action.payload._id}]},
      {
        _id: 'twoId',
        likes: [{userId: 'threeId'}],
      },
    ];
    expectedState.spots = initialState.spots;
    expectedState.filteredByLiked = [
      {_id: 'oneId', likes: [{userId: action.payload._id}]},
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
});
