import { combineReducers } from 'redux';

import lang from './lang';
import network from './network';
import list from './list';
import auth from './auth';
import location from './location';
import bottomTabs from './bottomTabs';
import delivaryPlaceBottomTabs from './DelivaryPlaceBottomTabs';
import chat from './chat';
import messages from './messages';
import notifications from './notifications';
import settings from './settings';
import wallet from './wallet';
import loadingOverlay from './loadingOverlay';

export default combineReducers({
  lang,
  network,
  list,
  auth,
  location,
  bottomTabs,
  delivaryPlaceBottomTabs,
  chat,
  messages,
  notifications,
  settings,
  wallet,
  loadingOverlay,
});
