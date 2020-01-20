/*
 *
 * RegistrationForm actions
 *
 */
import {
  SUBMIT_REGISTRATION,
  SUBMIT_REGISTRATION_SUCCESS,
  SUBMIT_REGISTRATION_ERROR,
} from './constants';

export function actionRegistration(user) {
  return {
    type: SUBMIT_REGISTRATION,
    user,
  };
}

export function actionRegistrationSuccess(response,methodtype) {
  return {
    type: SUBMIT_REGISTRATION_SUCCESS,
    response,
    methodtype
  };
}

export function actionRegistrationError(error) {
  return {
    type: SUBMIT_REGISTRATION_ERROR,
    error,
  };
}
