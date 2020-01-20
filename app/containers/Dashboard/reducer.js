import { fromJS } from 'immutable';
import {
  GET_ALL_EMPLOYEE,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_ERROR,
  CLEAR
} from './constants';

export const initialState = fromJS({
  allemployee: false,
  loading: false,
  error: false,
  response: false
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EMPLOYEE:
      return state.set('loading', true);
    case GET_ALL_EMPLOYEE_SUCCESS:
      return state.set('allemployee', action.allemployee).set('loading', false);
    case GET_ALL_EMPLOYEE_ERROR:
      return state.set('error', true).set('loading', false);
    case CLEAR:
      return state.set('error', false).set('loading', false).set('allemployee', false);
    default:
      return state;
  }
}

export default dashboardReducer;
