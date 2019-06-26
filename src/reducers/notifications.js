import * as types from '../actions/types';

const initialState = {
  unseenCount: 0,
};

const NotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UNSEEN_NOTIFICATION_COUNT_SET:
      return {
        ...state,
        unseenCountSubscribed: true,
        unseenCount: action.payload,
      };

    case types.UNSEEN_NOTIFICATION_COUNT_RESET:
      return { ...state, unseenCount: 0 };

    case types.LOGOUT:
      return { ...state, unseenCount: 0 };

    case types.CLEAR_NOTIFICATIONS:
      return { ...initialState, unseenCount: state.unseenCount };

    default:
      return state;
  }
};

export default NotificationsReducer;
