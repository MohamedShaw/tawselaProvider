import { SELECT_TAB } from './types';

export const onSelectTab = indx => async (dispatch, store) => {
  dispatch({
    type: SELECT_TAB,
    payload: indx,
  });
};
