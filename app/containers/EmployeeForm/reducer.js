import { fromJS } from 'immutable';
import {
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
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
  methodtype: false,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EMPLOYEE:
      return state
        .set('loading', true)
        .set('employee', action.employee)
        .set('actiontype', action.type);
    case CREATE_EMPLOYEE_SUCCESS:
      return state
        .set('response', action.response)
        .set('loading', false)
        .set('methodtype', action.methodtype)
        .set('actiontype', action.type);
    case CREATE_EMPLOYEE_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('actiontype', action.type);
    default:
      return state;
  }
}

export default dashboardReducer;
