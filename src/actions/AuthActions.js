import axios from 'axios';
import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_RESET_ERROR, LOGOUT } from './types';
import {
  API_ENDPOINT_GATEWAY,
  API_ENDPOINT_FOOD_SERVICE,
} from '../utils/Config';
import { showError } from '../common/utils/localNotifications';
import { AppNavigation } from '../common';
import { setHomeScreen, setHomeScreenDelivery } from '../utils';
import store from '../store';
import { clearWallet, setCollectableMoney, resetFlag } from './Wallet';
import { onSelectTab } from './BottomTabsActions';

const urlBasedOnKind = {
  HOME_COOKER: 'home-cookers',
  PARTY_COOKER: 'party-cookers',
  RESTAURANT: 'restaurants',
  DELIVERY_PLACE: 'delivery-places',
  FOOD_CAR: 'food-cars',
};

export const setCurrentUser = data => async (dispatch, getState) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data,
  });
};

const x = require('../assets/imgs/avatar.png');

export const resetLoginError = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN_RESET_ERROR,
  });
};
export const signIn = (values, setSubmitting) => async (dispatch, getState) => {
  try {
    const response = await axios.post(`${API_ENDPOINT_GATEWAY}user/login`, {
      email: values.email,
      password: values.password,
    });

    const user = { ...response.data, user: response.data };
    console.log('user ----', user);

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    console.log('response', response.data);
    AsyncStorage.setItem(
      '@CurrentUser',
      JSON.stringify({
        ...response.data,
      }),
    );

    // setHomeScreen();
    onSelectTab(0)(store.dispatch);
    Navigation.mergeOptions('MAIN_STACK', {
      bottomTabs: {
        currentTabIndex: 0,
      },
    });

    AppNavigation.init('MAIN_STACK', {
      bottomTabs: [
        {
          screen: 'home',
          label: 'Home',
          icon: x,
        },

        {
          screen: 'more',
          label: 'More',
          icon: x,
        },
      ],
    });
  } catch (error) {
    console.log('error====', JSON.parse(JSON.stringify(error)));

    setSubmitting(false);
    if (error[0].response && error[0].response.status === 401) {
      dispatch({ type: LOGIN_FAIL, payload: I18n.t('invalid-user') });
      // showError(I18n.t('invalid-user'));
    } else {
      dispatch({ type: LOGIN_FAIL, payload: error[1].message });
      // showError(error[1].message);
    }
  }
};

export function signUp(values, setSubmitting, countryCode) {
  return async (dispatch, getState) => {
    const data = new FormData();
    console.log('values ==>>', values);

    data.append('nameAr', values.nameAr);
    data.append('nameEn', values.nameEn);
    data.append('email', values.email);
    data.append('password', values.password);

    data.append('profileImage', {
      uri: values.profileImg,
      type: 'image/*',
      name: 'profile-image',
    });

    try {
      const response = await axios.post(`${API_ENDPOINT_GATEWAY}user`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const user = { ...response.data, user: response.data };

      console.log('user ******', user);

      AppNavigation.setStackRoot({
        name: 'completeData',
        passProps: {
          data: user,
        },
      });

      setSubmitting(false);
    } catch (error) {
      console.log('erorr======', JSON.parse(JSON.stringify(error)));
      dispatch({
        type: LOGIN_FAIL,
        payload: error[0].response.data.error.message,
      });

      setSubmitting(false);
    }
  };
}

export const autoLogin = () => async (dispatch, getState) => {
  let userData = '';
  try {
    userData = await AsyncStorage.getItem('@CurrentUser');
  } catch (error) {
    console.log('AsyncStorage#getItem error: ', error.message);
  }

  if (userData) {
    userData = JSON.parse(userData);
    const user = { ...userData, user: userData };

    console.log('auto login');
    console.log(userData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });
    return { exist: true };
  }
  return { exist: false };
};
export const logout = () => async (dispatch, getState) => {
  // const userId = store.getState().auth.currentUser.user.id;

  await AsyncStorage.setItem('@CurrentUser', '');
  AppNavigation.setStackRoot({
    name: 'signIn',
  });
  setTimeout(() => dispatch({ type: LOGOUT }), 1500);
};

export const checkAcceptance = data => async (dispatch, getState) => {
  const d = {
    ...data,
    providerUrl: urlBasedOnKind[data.kind],
  };

  dispatch({
    type: LOGIN_SUCCESS,
    payload: d,
  });

  AsyncStorage.setItem('@CurrentUser', JSON.stringify(d));

  // TODO
  console.log('data---------', data);

  if (data.accepted) {
    if (data.kind === 'DELIVERY_PLACE') {
      setHomeScreenDelivery();
    } else {
      setHomeScreen();
    }
  } else {
    AppNavigation.setStackRoot({
      name: 'accountReview',
    });
  }
};

const internalAcceptanceCheck = async data => {
  // TODO
  try {
    const response = await axios.get(
      `${API_ENDPOINT_FOOD_SERVICE}users/${data.user.id}/status`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      },
    );
    console.log('RES ------ status');
    console.log(response.data);

    return response.data.accepted;
  } catch (error) {
    showError(error[1].message);
    return false;
  }
};

export const checkServiceDataCompleted = data => async (dispatch, getState) => {
  const providerUrl = urlBasedOnKind[data.kind];

  try {
    const response = await axios.get(
      `${API_ENDPOINT_FOOD_SERVICE}${providerUrl}/${data.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      },
    );

    if (
      (response.data.settings.kitchenTypes &&
        response.data.settings.kitchenTypes.length) ||
      response.data.kind === 'DELIVERY_PLACE'
    ) {
      checkAcceptance({
        ...response.data,
        ...data,
      })(dispatch, getState);
    } else {
      AppNavigation.setStackRoot({
        name: 'serviceSettings',
        passProps: {
          userData: data,
          providerUrl,
        },
      });
    }
  } catch (error) {
    showError(error[1].message);
  }
};

export const clientCheck = (values, setSubmitting, user) => async (
  dispatch,
  getState,
) => {
  console.log('******', user);

  const { token } = user;
  const data = new FormData();

  data.append('transferFees', values.transferFees);
  data.append('gender', values.gender);
  data.append('busy', values.busy);
  data.append('identityCard', {
    uri: values.identityCard,
    type: 'image/*',
    name: 'identityCard',
  });

  try {
    const response = await axios.post(
      `${API_ENDPOINT_FOOD_SERVICE}providers`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );

    dispatch({ type: LOGIN_SUCCESS, payload: user });
    AsyncStorage.setItem(
      '@CurrentUser',
      JSON.stringify({
        ...user,
      }),
    );
    setHomeScreen();
    setSubmitting(false);
  } catch (error) {
    setSubmitting(false);
    if (error[0].response && error[0].response.status === 401) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t('ui-networkConnectionError'),
      });
    } else {
      dispatch({ type: LOGIN_FAIL, payload: error[1].message });
    }
  }
};
