import * as Types from '../actions/types';

const initialState = {
  spots: null,
  error: null,
  filteredByLiked: [],
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
    case Types.ADD_LIKE:
      const spotsToFilter = [...state.spots];
      const spotFiltered = spotsToFilter.filter(
        spot => spot._id === action.payload.spot._id,
      );

      const addLikeToSpotsFiltered = (spotFiltered[0].likes = [
        ...action.payload.likes,
      ]);

      state.spots.filter(
        spot => spot._id === action.payload.spot._id,
      )[0].likes = addLikeToSpotsFiltered;

      return {
        ...state,
      };
    case Types.REMOVE_LIKE:
      const spotsToFilterForRemoval = [...state.spots];
      const spotFilteredForRemoval = spotsToFilterForRemoval.filter(
        spot => spot._id === action.payload.spotId,
      );

      const removeLikeFromSpotsFiltered = spotFilteredForRemoval[0].likes.filter(
        like => like.userId !== action.payload.userId,
      );

      state.spots.filter(
        spot => spot._id === action.payload.spotId,
      )[0].likes = removeLikeFromSpotsFiltered;
      return {
        ...state,
      };
    case Types.ADD_COMMENT:
      const spotsToFilterComment = [...state.spots];
      const spotFilteredComment = spotsToFilterComment.filter(
        spot => spot._id === action.payload.spot._id,
      );
      const addCommentToSpotsFiltered = (spotFilteredComment[0].comments = [
        ...action.payload.comments,
      ]);

      state.spots.filter(
        spot => spot._id === action.payload.spot._id,
      )[0].comments = addCommentToSpotsFiltered;

      return {
        ...state,
      };
    case Types.LIKES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
