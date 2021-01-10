/* eslint-disable no-shadow */
import {
  CHAT_LIST_ERR,
  CHAT_LIST_ISLOADING,
  CHAT_LIST_GET_ITEM,
} from '../constants/chat';
import {navigate} from '../services/navRef';
import {chatService} from '../services/chatService';

export const isloading = (isloading) => ({
  type: CHAT_LIST_ISLOADING,
  payload: isloading,
});

export const getMessageItems = (data) => ({
  type: CHAT_LIST_GET_ITEM,
  payload: data,
});

export const errorMessage = (errorMessage) => ({
  type: CHAT_LIST_ERR,
  payload: errorMessage,
});

export const getChatUserItems = () => (dispatch) => {
  dispatch(isloading(true));
  chatService
    .getChatUsersItem()
    .then(async (res) => {
      await dispatch(getMessageItems(res.data));
    })
    .catch((err) => {
      dispatch(errorMessage(err));
    })
    .finally(() => {
      dispatch(isloading(false));
    });
};
