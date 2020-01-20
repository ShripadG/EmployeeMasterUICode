/*
 *
 * Employee actions
 *
 */

import {
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
} from './constants';

export function addEmployee(employee) {
  return {
    type: CREATE_EMPLOYEE,
    employee,
  };
}

export function addEmployeeSuccess(response, methodtype) {
  return {
    type: CREATE_EMPLOYEE_SUCCESS,
    response,
    methodtype,
  };
}

export function addEmployeeError(error) {
  return {
    type: CREATE_EMPLOYEE_ERROR,
    error,
  };
}
