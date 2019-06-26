import { Navigation } from 'react-native-navigation';
import { AppNavigation } from '../common';

import { GOOGLE_KEY } from './Config';
import { onSelectTab } from '../actions/BottomTabsActions';
import { delivaryPlaceOnSelectTab } from '../actions/DelivaryPlaceBottomTabsActions';
import store from '../store';

const x = require('../assets/imgs/avatar.png');

export function getPlaceName(latitude, longitude) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}&language=ar`,
  )
    .then(res => res.json())
    .then(json => {
      if (json.status !== 'OK') {
        throw new Error(`Geocode error: ${json.status}`);
      }

      return [json.results[0].formatted_address, '', ''];
      return [
        json.results[1].address_components[0].short_name,
        ' ',
        json.results[1].address_components[1].short_name,
      ];
    });
}

export function setHomeScreen() {
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
}

export function secondsToHMS(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  return { hours: h, minutes: m, seconds: s };
}

export function setHomeScreenDelivery() {
  delivaryPlaceOnSelectTab(0)(store.dispatch);
  Navigation.mergeOptions('MAIN_STACK', {
    bottomTabs: {
      currentTabIndex: 0,
    },
  });
  AppNavigation.init('MAIN_STACK', {
    bottomTabs: [
      {
        screen: 'delivaryPlaceHome',
        label: 'Home',
      },
      {
        screen: 'delivaryPlaceParteners',
        label: 'Parteners',
      },
      {
        screen: 'delivaryPlaceWallet',
        label: 'Wallet',
      },
      {
        screen: 'delivaryPlaceMore',
        label: 'More',
      },
    ],
  });
}
