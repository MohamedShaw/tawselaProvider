import { SET_LOADING_OVERLAY_STATUS } from '../actions/types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_OVERLAY_STATUS:
      return { ...state, [action.name]: action.status };

    default:
      return state;
  }
};

export default reducer;
