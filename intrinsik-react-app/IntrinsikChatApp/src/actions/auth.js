/* eslint-disable no-shadow */
import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
} from '../constants/auth';
import {navigate} from '../services/navRef';
import {userService} from '../services/userService';

export const loggingIn = (loggingIn) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn,
});

export const loggedIn = (data) => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const login = (email, password) => (dispatch) => {
  if (validate(email, password)) {
    dispatch(loggingIn(true));
    userService
      .login(email, password)
      .then(async (res) => {
        await dispatch(loggedIn(res.data));
        await navigate('Home');
      })
      .catch((err) => {
        dispatch(errorLogIn('Wrong username or password'));
      })
      .finally(() => {
        dispatch(loggingIn(false));
      });
  }
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout = () => async (dispatch, getState) => {
  dispatch(loggingOut(true));
  await userService
    .logout(getState)
    .then((res) => {
      dispatch(loggedOut());
    })
    .catch((err) => {
      dispatch(errorLogOut('Error logging out.'));
    })
    .finally(() => {
      dispatch(loggingOut(false));
    });
};
const validate = (email, passowrd) => {
  if (email === '' || passowrd === '') {
    // eslint-disable-next-line no-alert
    alert('The email and password are reuired.');
    return false;
  }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    alert('Please enter a valid email address.');
    return false;
  }
  return true;
};
