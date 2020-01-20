/*
 *
 * RegistrationForm reducer
 *
 */
import { fromJS } from 'immutable';
import {
  SUBMIT_REGISTRATION,
  SUBMIT_REGISTRATION_SUCCESS,
  SUBMIT_REGISTRATION_ERROR,
} from './constants';
/* eslint-disable default-case, no-param-reassign */
export const initialState = fromJS({
  username: false,
  password: false,
  emailID: false,
  roletype: false,
  loading: false,
  user: false,
  error: false,
  response: false,
  methodtype: false,
  isEmployeeMaster: false,
  isILCMaster: false,
  isForcastMaster: false,
  isFinancials: false,
  isReports: false,
  isLoginMaster: false
});

function registrationFormReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_REGISTRATION:
      return state.set('loading', true).set('response', false).set('user', action.user);

    case SUBMIT_REGISTRATION_SUCCESS:
      return state
        .set('loading', false)
        .set('user', false)
        .set('methodtype', action.methodtype)
        .set('response', action.response);

    case SUBMIT_REGISTRATION_ERROR:
      return state.set('error', true).set('loading', false);

    default:
      return state;
  }
}

export default registrationFormReducer;
