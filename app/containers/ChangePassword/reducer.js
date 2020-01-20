/*
 *
 * ChangePassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_CHANGEPASSWORD,
  SUBMIT_CHANGEPASSWORD_SUCCESS,
  SUBMIT_CHANGEPASSWORD_ERROR,
} from './constants';
/* eslint-disable default-case, no-param-reassign */
export const initialState = fromJS({
  password: false,
  repassword: false,
});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CHANGEPASSWORD:
      return state.set('loading', true).set('user', action.user);

    case SUBMIT_CHANGEPASSWORD_SUCCESS:
      return state
        .set('loading', false)
        .set('methodtype', action.methodtype)
        .set('response', action.response);

    case SUBMIT_CHANGEPASSWORD_ERROR:
      return state.set('error', true).set('loading', false);

    default:
      return state;
  }
}

export default changePasswordReducer;
