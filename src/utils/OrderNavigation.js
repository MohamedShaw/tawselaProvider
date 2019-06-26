import { AppNavigation } from '../common';

const currentOrderScreens = {
  'home-cooker-order': 'currentOrderDetailsHomeCooker',
  'party-cooker-order': 'currentOrderDetailsPartyCooker',
  'food-car-order': 'currentOrderDetailsFoodCar',
  'restaurant-order': 'currentOrderDetailsRestaurant',
};

const refusedOrderScreens = {
  'home-cooker-order': 'refusedOrderDetailsHomeCooker',
  'party-cooker-order': 'refusedOrderDetailsPartyCooker',
  'food-car-order': 'refusedOrderDetailsFoodCar',
  'restaurant-order': 'refusedOrderDetailsRestaurant',
};

const deliveredOrderScreens = {
  'home-cooker-order': 'deliveredOrderDetailsHomeCooker',
  'party-cooker-order': 'deliveredOrderDetailsPartyCooker',
  'food-car-order': 'deliveredOrderDetailsFoodCar',
  'restaurant-order': 'deliveredOrderDetailsRestaurant',
};

export const orderStatusNavigationPush = async (status, id, kind) => {
  switch (status) {
    case 'PENDING':
    case 'ACCEPTED':
    case 'FINISHED':
    case 'ARRIVED':
      AppNavigation.push({
        stackName: 'ORDER_STACK',
        name: currentOrderScreens[kind],
        passProps: {
          orderId: id,
          status,
        },
      });
      break;

    case 'REFUSED':
    case 'CANCELLED_BY_CLIENT':
    case 'CANCELLED_BY_COOKER':
      AppNavigation.push({
        stackName: 'ORDER_STACK',
        name: refusedOrderScreens[kind],
        passProps: {
          orderId: id,
          status,
        },
      });
      break;

    case 'DELIVERED':
      AppNavigation.push({
        stackName: 'ORDER_STACK',
        name: deliveredOrderScreens[kind],
        passProps: {
          orderId: id,
          status,
        },
      });
      break;

    default:
      break;
  }
};

export const orderStatusNavigationReplaceImmediate = (status, id, kind) => {
  switch (status) {
    case 'PENDING':
    case 'ACCEPTED':
    case 'FINISHED':
    case 'ARRIVED':
      AppNavigation.setStackRoot(
        {
          name: currentOrderScreens[kind],
          passProps: {
            orderId: id,
            status,
          },
        },
        'ORDER_STACK',
      );
      break;

    case 'REFUSED':
    case 'CANCELLED_BY_CLIENT':
    case 'CANCELLED_BY_COOKER':
      AppNavigation.setStackRoot(
        {
          name: refusedOrderScreens[kind],
          passProps: {
            orderId: id,
            status,
          },
        },
        'ORDER_STACK',
      );
      break;

    case 'DELIVERED':
      AppNavigation.setStackRoot(
        {
          name: deliveredOrderScreens[kind],
          passProps: {
            orderId: id,
            status,
          },
        },
        'ORDER_STACK',
      );
      break;

    default:
      break;
  }
};

export const orderStatusNavigationReplace = (initial, status, id, kind) => {
  if (Array.isArray(initial)) {
    if (initial.indexOf(status) !== -1) return;
  }

  if (initial === status) return;

  orderStatusNavigationReplaceImmediate(status, id, kind);
};
