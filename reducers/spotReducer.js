import * as Types from '../actions/types';

const initialState = {
  spots: null,
  error: null,
  filteredByLiked: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SPOTS:
      return {
        ...state,
        spots: action.payload,
      };
    case Types.SPOTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case Types.FILTER_BY_USER_LIKES:
      let filterBasedOnUserLike = [];
      if (state.spots !== null) {
        for (let i = 0; i < state.spots.length; i++) {
          state.spots[i].likes.map(like => {
            if (like.userId === action.payload._id) {
              filterBasedOnUserLike.push(state.spots[i]);
            }
          });
        }
        return {
          ...state,
          filteredByLiked: filterBasedOnUserLike,
        };
      }
      return state;
    default:
      return state;
  }
};
