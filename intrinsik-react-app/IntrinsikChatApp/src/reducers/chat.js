import {
  CHAT_LIST_ERR,
  CHAT_LIST_ISLOADING,
  CHAT_LIST_GET_ITEM,
} from '../constants/chat';

const INITIAL_STATE = {
  chatListItems: null,
  isloading: false,
  errorMessage: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHAT_LIST_GET_ITEM: {
      let {chatListItems} = action.payload;
      return {
        ...state,
        chatListItems,
        errorMessage: null,
        isloading: false,
      };
    }
    case CHAT_LIST_ERR: {
      return {
        ...state,
        isloading: false,
        errorMessage: action.payload,
      };
    }
    case CHAT_LIST_ISLOADING: {
      return {
        ...state,
        errorMessage: action.payload ? null : state.errorMessage,
        isloading: action.payload,
      };
    }
    default:
      return state;
  }
}
