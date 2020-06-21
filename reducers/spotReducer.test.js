import spotReducer from './spotReducer';
import * as Types from '../actions/types';

describe('spotReducer', () => {
  let initialState;
  let expectedState;
  beforeEach(() => {
    initialState = {
      spots: null,
      error: null,
      filteredByLiked: [],
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
  test('changes state on add like', () => {
    const action = {
      type: Types.ADD_LIKE,
      payload: {spot: {_id: 'oneId', likes: []}, likes: [{_id: 'twoId'}]},
    };
    initialState.spots = [{_id: action.payload.spot._id, likes: []}];

    expectedState.spots = [
      {_id: action.payload.spot._id, likes: [action.payload.likes[0]]},
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
  test('changes state on remove from like table', () => {
    const action = {
      type: Types.REMOVE_LIKE,
      payload: {spotId: 'oneSpotId', userId: 'oneUserId'},
    };
    initialState.spots = [
      {
        _id: action.payload.spotId,
        likes: [
          {userId: action.payload.userId},
          {userId: 'action.payload.userId'},
        ],
      },
      {_id: 'randomSpotId', likes: [{userId: 'randomUserId'}]},
    ];

    expectedState.spots = [
      {
        _id: action.payload.spotId,
        likes: [{userId: 'action.payload.userId'}],
      },
      {_id: 'randomSpotId', likes: [{userId: 'randomUserId'}]},
    ];

    expect(spotReducer(initialState, action)).toEqual(expectedState);
  });
});
