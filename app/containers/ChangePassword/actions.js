/*
 *
 * ChangePassword actions
 *
 */

import {
  SUBMIT_CHANGEPASSWORD,
  SUBMIT_CHANGEPASSWORD_SUCCESS,
  SUBMIT_CHANGEPASSWORD_ERROR,
} from './constants';

export function actionChangePassword(user) {
  return {
    type: SUBMIT_CHANGEPASSWORD,
    user,
  };
}

export function actionChangePasswordSuccess(response, methodtype) {
  return {
    type: SUBMIT_CHANGEPASSWORD_SUCCESS,
    response,
    methodtype,
  };
}

export function actionChangePasswordError(error) {
  return {
    type: SUBMIT_CHANGEPASSWORD_ERROR,
    error,
  };
}