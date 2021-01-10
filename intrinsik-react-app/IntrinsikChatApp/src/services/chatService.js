import axios from 'axios';
import {setAuthAsyncStorage} from './getAuthAsyncStorage';

function getChatUsersItem() {
  let payload = {
    token: '97N_rCmPSir88Y9-ByFiVQ',
  };

  let url = 'https://app.fakejson.com/q/e6KWuiNs';
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(async (response) => {
        try {
          await setAuthAsyncStorage(response, 1);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const chatService = {
  getChatUsersItem,
};
