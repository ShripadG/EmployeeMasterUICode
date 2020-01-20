/*
 *
 * ILCMaster reducer
 *
 */
import { fromJS } from 'immutable';
import {
  GET_ILC,
  GET_ILC_SUCCESS,
  GET_ILC_ERROR,
  GET_ALL_ILC,
  GET_ALL_ILC_SUCCESS,
  GET_ALL_ILC_ERROR,
  
  CLEAR_ILC,
  CLEAR,
  CREATE_ILC,
  CREATE_ILC_SUCCESS,
  CREATE_ILC_ERROR
} from './constants';

export const initialState = fromJS({
  allILC: false,
  ILC: false,
  loading: false,
  error: false,
  ILCid: false,
  response: false,
  actiontype: false,
  methodtype: false,
});

function ILCMasterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ILC:
      return state
        .set('loading', true)
        .set('actiontype', action.type)
        .set('allILC', false)
        .set('response', false)
        .set('methodtype', false)
        .set('actiontype', false);
    case GET_ALL_ILC_SUCCESS:
      return state
        .set('allILC', action.allILC)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ALL_ILC_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ILC:
      return state
        .set('ILCid', action.ILCid)
        .set('loading', true)
        .set('actiontype', action.type);
    case GET_ILC_SUCCESS:
      return state
        .set('ILC', action.ILC)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ILC_ERROR:
      return state.set('error', true).set('loading', false);
    case CLEAR_ILC:
      return state.set('allILC', false);
    case CLEAR:
      return state
        .set('allILC', false)
        .set('ILC', false)
        .set('response', false)
        .set('loading', false)
        .set('methodtype', false)
        .set('actiontype', 'LOGOUT')
        .set('loading', false);
      case CREATE_ILC:
        return state
          .set('loading', true)
          .set('ILC', action.ILC)
          .set('actiontype', action.type);
      case CREATE_ILC_SUCCESS:
        return state
          .set('response', action.response)
          .set('loading', false)
          .set('methodtype', action.methodtype)
          .set('actiontype', action.type);
      case CREATE_ILC_ERROR:
          return state
            .set('error', true)
            .set('loading', false)
            .set('actiontype', action.type);
    default:
      return state;
  }
}

export default ILCMasterReducer;
