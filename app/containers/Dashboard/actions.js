/*
 *
 * Dashboard actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_EMPLOYEE,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_ERROR,
  CLEAR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllEmployee() {
  return {
    type: GET_ALL_EMPLOYEE,
  };
}

export function getAllEmployeeSuccess(allemployee) {
  return {
    type: GET_ALL_EMPLOYEE_SUCCESS,
    allemployee,
  };
}

export function getAllEmployeeError(error) {
  return {
    type: GET_ALL_EMPLOYEE_ERROR,
    error,
  };
}

export function onDashboardClear() {
  return {
    type: CLEAR
  };
}


