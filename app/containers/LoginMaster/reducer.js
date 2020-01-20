/*
 *
 * LoginMaster reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_ALL_USER,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  CLEAR_USER,
  CLEAR
} from './constants';

export const initialState = fromJS({
  alluser: false,
  user: false,
  loading: false,
  error: false,
  userid: false,
  response: false,
  actiontype: false,
  methodtype: false,
});

function loginMasterReducer(state = initialState, action) {
  //console.log(action.type,'red')
  switch (action.type) {
    case GET_ALL_USER:
      return state
        .set('loading', true)
        .set('actiontype', action.type)
        .set('user', false)
        .set('response', false)
        .set('methodtype', false)
        .set('actiontype', false);
    case GET_ALL_USER_SUCCESS:
      return state
        .set('alluser', action.alluser)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ALL_USER_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_USER:
      return state
        .set('userid', action.userid)
        .set('loading', true)
        .set('actiontype', action.type);
    case GET_USER_SUCCESS:
      return state
        .set('user', action.user)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_USER_ERROR:
      return state.set('error', true).set('loading', false);
    case DELETE_USER:
      return state
        .set('user', action.user)
        .set('loading', true)
        .set('actiontype', action.type);
    case DELETE_USER_SUCCESS:
      return state
        .set('response', action.response)
        .set('loading', false)
        .set('methodtype', action.methodtype)
        .set('actiontype', action.type);
    case DELETE_USER_ERROR:
      return state.set('error', true).set('loading', false);
    case CLEAR_USER:
      return state.set('user', false);
    case CLEAR:
      return state
        .set('user', false)
        .set('alluser', false)
        .set('response', false)
        .set('loading', false)
        .set('methodtype', false)
        .set('actiontype', 'LOGOUT')
        .set('loading', false);
    default:
      return state;
  }
}

export default loginMasterReducer;
