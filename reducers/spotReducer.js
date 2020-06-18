import * as Types from '../actions/types';

const initialState = {
  spots: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SPOTS:
      return {
        ...state,
        spots: action.payload,
      };
    default:
      return state;
  }
};
