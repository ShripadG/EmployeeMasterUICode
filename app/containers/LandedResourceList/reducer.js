import { fromJS } from 'immutable';
import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR,
  GET_ALL_EMPLOYEE,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_ERROR,
  CLEAR_PERSON,
  CLEAR,
} from './constants';

export const initialState = fromJS({
  allemployee: false,
  employee: false,
  loading: false,
  error: false,
  empid: false,
  revid: false,
  response: false,
  actiontype: false,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EMPLOYEE:
      return state.set('loading', true).set('actiontype', action.type);
    case GET_ALL_EMPLOYEE_SUCCESS:
      return state
        .set('allemployee', action.allemployee)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_ALL_EMPLOYEE_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_EMPLOYEE:
      return state
        .set('empid', action.empid)
        .set('loading', true)
        .set('actiontype', action.type);
    case GET_EMPLOYEE_SUCCESS:
      return state
        .set('employee', action.employee)
        .set('loading', false)
        .set('actiontype', action.type);
    case GET_EMPLOYEE_ERROR:
      return state.set('error', true).set('loading', false);
    case CLEAR_PERSON:
      return state.set('employee', false);
    case CLEAR:
      return state
        .set('employee', false)
        .set('allemployee', false)
        .set('empid', false)
        .set('revid', false);
    default:
      return state;
  }
}

export default dashboardReducer;
