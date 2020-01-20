/*
 *
 * LoginForm reducer
 *
 */
import { fromJS } from 'immutable';
import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_ERROR,
  LOGOUT,
  USERRIGHT,
} from './constants';
/* eslint-disable default-case, no-param-reassign */
export const initialState = fromJS({
  username: false,
  password: false,
  loading: false,
  error: false,
  response: false,
  message: null,
  user_right:null
});

function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('username', action.username)
        .set('password', action.password);
    case SUBMIT_LOGIN_SUCCESS:
      return state.set('loading', false).set('response', action.response);
    case SUBMIT_LOGIN_ERROR:
      return state.set('error', true).set('loading', false);
    case LOGOUT:
      return state
        .set('loading', false)
        .set('response', false)
        .set('error', false);
    case USERRIGHT:
      return state.set('user_right', action.response);
    default:
      return state;
  }
}

export default loginFormReducer;
