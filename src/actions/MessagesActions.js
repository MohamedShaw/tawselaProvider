import axios from 'axios';
import { AppState } from 'react-native';
import I18n from 'react-native-i18n';

import { UNSEEN_MESSAGE_COUNT_SET, UNSEEN_MESSAGES_COUNT_RESET } from './types';

import { API_ENDPOINT_FOOD_SERVICE } from '../utils/Config';
import { getClient } from './DeepStream';
import store from '../store';

export function initUnseenMessagesCount(userId) {
  if (!userId) return;

  getClient()
    .record.getRecord(`fsa-ds-conversations-messages-count/providers/${userId}`)
    .subscribe(async data => {
      console.log('msg count--------------', data);
      // const currentConversationId = store.getState().chat.conversationId;
      // if (currentConversationId !== data.firedByConversationId) {
      store.dispatch({
        type: UNSEEN_MESSAGE_COUNT_SET,
        payload: data.unseenCount,
      });
      // }
    });
}

export function closeUnseenMessagesCount(userId) {
  if (!userId) return;

  getClient()
    .record.getRecord(`fsa-ds-conversations-messages-count/providers/${userId}`)
    .unsubscribe();
  setTimeout(() => {
    getClient()
      .record.getRecord(
        `fsa-ds-conversations-messages-count/providers/${userId}`,
      )
      .discard();
  }, 200);
}

export function resetUnseenMessagesCount() {
  return async (dispatch, getState) => {
    const userId = getState().auth.currentUser.user.id;
    dispatch({
      type: UNSEEN_MESSAGES_COUNT_RESET,
    });
    try {
      await axios.patch(
        `${API_ENDPOINT_FOOD_SERVICE}providers/${userId}/conversations/messages/reset-count`,
      );

      console.log('RESET inseen count msgs SUCCESS');
    } catch (error) {
      console.log('Error resetting messages count');
      console.log(JSON.parse(JSON.stringify(error)));
    }
  };
}
