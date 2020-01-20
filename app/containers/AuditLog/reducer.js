import { fromJS } from 'immutable';
import {
  GET_ALL_AUDITLOG,
  GET_ALL_AUDITLOG_SUCCESS,
  GET_ALL_AUDITLOG_ERROR
} from './constants';

export const initialState = fromJS({
  allAuditLog: false,
  loading: false,
  error: false,
  response: false,
  actiontype: false
});

function auditLogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_AUDITLOG:
      return state.set('loading', true).set('actiontype', action.type);
    case GET_ALL_AUDITLOG_SUCCESS:
      return state
        .set('allAuditLog', action.allAuditLog)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ALL_AUDITLOG_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('actiontype', action.type);
    default:
      return state;
  }
}

export default auditLogReducer;
