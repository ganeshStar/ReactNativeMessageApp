import axios from 'axios';
import {
  resetAuthAsyncStorage,
  setAuthAsyncStorage,
} from './getAuthAsyncStorage';

function login(email, password) {
  let payload = {
    token: '97N_rCmPSir88Y9-ByFiVQ',
    data: {
      name: 'Ganesh Madane',
      email: email,
      phone: 'phoneHome',
    },
  };

  let url = 'https://api.mocki.io/v1/3e17b193'; // 'https://app.fakejson.com/q/e6KWuiNs';
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(async (response) => {
        try {
          await setAuthAsyncStorage(response, 0);
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

function logout(getState) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        await resetAuthAsyncStorage();
        resolve(true);
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
}

export const userService = {
  login,
  logout,
};
