import * as Types from '../actions/types';

const initialState = {
  spots: null,
  error: null,
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
    default:
      return state;
  }
};
