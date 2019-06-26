import { SET_LOADING_OVERLAY_STATUS } from './types';

export const setLoadingOverlay = (name, status) => async (dispatch, store) => {
  dispatch({ type: SET_LOADING_OVERLAY_STATUS, name, status });
};
