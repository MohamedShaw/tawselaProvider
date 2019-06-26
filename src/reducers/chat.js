import * as types from '../actions/types';

const initialState = {
  conversationId: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONVERSATION_ID:
      return { ...state, conversationId: action.payload };
    case types.RE_SET_CONVERSATION_ID:
      return { ...state, conversationId: null };
    default:
      return state;
  }
};
export default ChatReducer;
