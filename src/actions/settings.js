import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';
import 'moment/locale/ar';
import axios from 'axios';
import { API_ENDPOINT_GATEWAY } from '../utils/Config';

import { SET_SETTINGS, CLEAR_SETTINGS } from './types';

export const setSettings = data => async (dispatch, getState) => {
  dispatch({ type: SET_SETTINGS, payload: data });
};

export const clearSettings = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_SETTINGS });
};
