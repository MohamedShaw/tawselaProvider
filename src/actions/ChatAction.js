import { SET_CONVERSATION_ID, RE_SET_CONVERSATION_ID } from './types';

export const onSetConversationId = id => dispatch => {
  dispatch({
    type: SET_CONVERSATION_ID,
    payload: id,
  });
};

export const onReSetConversationId = () => dispatch => {
  dispatch({
    type: RE_SET_CONVERSATION_ID,
  });
};
