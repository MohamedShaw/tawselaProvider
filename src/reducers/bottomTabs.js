import * as types from '../actions/types';

const initialState = {
  selectedIndx: 0,
};

const BottomTabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_TAB:
      return { ...state, selectedIndx: action.payload };
    default:
      return state;
  }
};
export default BottomTabsReducer;
