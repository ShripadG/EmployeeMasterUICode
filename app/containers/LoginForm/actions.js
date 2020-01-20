/*
 *
 * LoginForm actions
 *
 */

import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_ERROR,
  LOGOUT,
  USERRIGHT,
} from './constants';

export function actionLogin(username, password) {
  return {
    type: SUBMIT_LOGIN,
    username,
    password,
  };
}

export function actionLoginSuccess(response) {
  return {
    type: SUBMIT_LOGIN_SUCCESS,
    response,
  };
}

export function actionLoginError(error) {
  return {
    type: SUBMIT_LOGIN_ERROR,
    error,
  };
}
export function onLogout() {
  return {
    type: LOGOUT,
  };
}

export function actionUserRight(response) {
  return {
    type: USERRIGHT,
    response,
  };
}
