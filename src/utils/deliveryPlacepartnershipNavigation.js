import { AppNavigation } from '../common';
import store from '../store';

export const partnershipStatusNavigationPush = async data => {
  const kind = store.getState().auth.currentUser.kind;
  switch (data.status) {
    // TODO navigate  to normal order pages
    // case 'HC_PARTNERSHIP_FINISHED_ORDER':

    case 'PENDING': // tlb 4raka gded
    case 'ACCEPTED':
      if (kind === 'HOME_COOKER') {
        AppNavigation.push({
          name: 'deliveryPlacesMap',
        });
      } else {
        AppNavigation.push({
          name: 'homecookerDeliveryPlaceProfile',
          passProps: {
            data,
          },
        });
      }
      break;

    default:
      break;
  }
};
