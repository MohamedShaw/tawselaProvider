import * as types from '../actions/types';

const initialState = {
  collectableEarnings: 0,
  freezedEarnings: 0,
  totalEarnings: 0,
  initial: true,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_WALLET:
      return {
        ...state,
        collectableEarnings: action.payload.collectableEarnings,
        freezedEarnings: action.payload.freezedEarnings,
        totalEarnings: action.payload.totalEarnings,
      };
    case types.RESET_FLAG:
      return {
        ...state,
        initial: false,
      };
    case types.CLEAR_WALLET:
      return {
        ...state,
        collectableEarnings: 0,
        freezedEarnings: 0,
        totalEarnings: 0,
      };

    default:
      return state;
  }
};
export default settings;
