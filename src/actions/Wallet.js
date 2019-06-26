import { SET_WALLET, CLEAR_WALLET, RESET_FLAG } from './types';

export const setCollectableMoney = (data, num) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: SET_WALLET, payload: data });
};

export const clearWallet = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_WALLET });
};
export const resetFlag = () => async (dispatch, getState) => {
  dispatch({ type: RESET_FLAG });
};
