import { DELIVARY_PLACE_SELECT_TAB } from './types';

export const delivaryPlaceOnSelectTab = indx => async (dispatch, store) => {
  dispatch({
    type: DELIVARY_PLACE_SELECT_TAB,
    payload: indx,
  });
};
