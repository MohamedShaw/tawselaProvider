import { Navigation } from 'react-native-navigation';
import { AsyncStorage, Platform, Text } from 'react-native';
import axios from 'axios';
import I18n from 'react-native-i18n';
// import firebase from 'react-native-firebase';
import store from './store';
import registerScreens from './screens';
import {
  getColors,
  AppNavigation as nv,
  registerCustomIconType,
} from './common';
import { initInternetConnection } from './actions/network';
import { initLang, setLang } from './actions/lang';

import icoMoonConfig from './common/utils/selection.json';
import { autoLogin } from './actions/AuthActions';
import { onSelectTab } from './actions/BottomTabsActions';
import { delivaryPlaceOnSelectTab } from './actions/DelivaryPlaceBottomTabsActions';
import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from './actions/location';
import colors from './common/defaults/colors';

export const startApp = () => {
  registerCustomIconType('custom', icoMoonConfig);
  registerScreens();

  axios.interceptors.request.use(
    config => {
      const { currentUser } = store.getState().auth;
      const { lang } = store.getState().lang;

      return {
        ...config,
        headers: {
          'Accept-Language': lang,
          Authorization: currentUser
            ? `Bearer ${currentUser.token}`
            : config.headers.Authorization,
          ...config.headers,
        },
      };
    },
    error => {
      Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    response => response,
    error => {
      let errorTxt = '';

      if (!store.getState().network.isConnected || !error.response) {
        errorTxt = I18n.t('ui-networkConnectionError');
      } else if (Object.getDeepProp(error, 'response.data.error.message')) {
        errorTxt = error.response.data.error.message;
      } else if (
        Object.getDeepProp(error, 'response.data.error.body[0].message')
      ) {
        errorTxt = error.response.data.error.body[0].message;
      } else if (Object.getDeepProp(error, 'response.data.error')) {
        errorTxt = error.response.data.error;
      } else {
        errorTxt = I18n.t('ui-error-happened');
      }

      // handle multi errors
      let errors = {};
      const allErrors = [];
      if (Array.isArray(Object.getDeepProp(error, 'response.data.error'))) {
        const errs = Object.getDeepProp(error, 'response.data.error');

        errs.forEach(item => {
          errors = {
            ...errors,
            ...item,
          };

          allErrors.push(Object.values(item)[0]);
        });
      }

      return Promise.reject([error, new Error(errorTxt), errors, allErrors]);
    },
  );

  Navigation.events().registerAppLaunchedListener(async () => {
    const once = false;
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        style: Platform.Version < 23 ? 'light' : 'dark',
        backgroundColor: colors.statusBar,
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      layout: {
        backgroundColor: 'white',
        orientation: ['portrait'],
      },
      animations: {
        push: {
          waitForRender: false,
        },
        showModal: {
          waitForRender: false,
        },
      },
      bottomTabs: {
        // currentTabIndex: 0,
        visible: false,
        animate: false,
      },
    });
    // await setLang('ar', true)(store.dispatch);
    // AsyncStorage.setItem('lang', '');

    await initLang('ar', true)(store.dispatch);

    initInternetConnection(store.dispatch);
    checkLocationPermission(true, () => {
      initBackgroundGeolocation(store.dispatch, store.getState);
    });
    // AsyncStorage.setItem('@CurrentUser', '');

    const { exist } = await autoLogin()(store.dispatch, store.getState);
    onSelectTab(0)(store.dispatch);
    Navigation.mergeOptions('MAIN_STACK', {
      bottomTabs: {
        currentTabIndex: 0,
      },
    });

    if (exist) {
      nv.init('MAIN_STACK', {
        bottomTabs: [
          {
            screen: 'home',
            label: 'Home',
            icon: require('./assets/imgs/avatar.png'),
          },

          {
            screen: 'more',
            label: 'More',
            icon: require('./assets/imgs/avatar.png'),
          },
        ],
      });
    } else {
      nv.init('MAIN_STACK', {
        name: 'walkthrough',
      });
    }
  });
};
