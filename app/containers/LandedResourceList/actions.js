/*
 *
 * Employee actions
 *
 */

import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR,
  GET_ALL_EMPLOYEE,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  CLEAR_PERSON,
  CLEAR,
} from './constants';

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

export function getEmployee(empid) {
  return {
    type: GET_EMPLOYEE,
    empid,
  };
}

export function getEmployeeSuccess(employee) {
  return {
    type: GET_EMPLOYEE_SUCCESS,
    employee,
  };
}

export function getEmployeeError(error) {
  return {
    type: GET_EMPLOYEE_ERROR,
    error,
  };
}
export function deleteEmployee(empid, revid) {
  return {
    type: DELETE_EMPLOYEE,
    empid,
    revid,
  };
}

export function deleteEmployeeSuccess(response) {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    response,
  };
}

export function deleteEmployeeError(error) {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    error,
  };
}
export function clearPerson() {
  return {
    type: CLEAR_PERSON,
  };
}
export function onEmployeeClear() {
  return {
    type: CLEAR,
  };
}
