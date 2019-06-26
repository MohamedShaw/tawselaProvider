import * as types from '../actions/types';

const initialState = {
  unseenCount: 0,
};

const MessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UNSEEN_MESSAGE_COUNT_SET:
      return {
        ...state,
        unseenCount: action.payload,
      };

    case types.UNSEEN_MESSAGES_COUNT_RESET:
      return { ...state, unseenCount: 0 };

    case types.LOGOUT:
      return { ...state, unseenCount: 0 };

    default:
      return state;
  }
};

export default MessagesReducer;
