import * as types from '../actions/types';

const initialState = {
  settings: null,
  error: null,
  providerData: null,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload.settings,
        providerData: action.payload,
      };
    case types.CLEAR_SETTINGS:
      return { ...state, settings: null, providerData: null };

    default:
      return state;
  }
};
export default settings;
