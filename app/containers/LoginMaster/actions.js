/*
 *
 * LoginMaster actions
 *
 */

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
  CLEAR,
} from './constants';

export function getAllUser() {
  return {
    type: GET_ALL_USER,
  };
}

export function getAllUserSuccess(alluser) {
  return {
    type: GET_ALL_USER_SUCCESS,
    alluser,
  };
}

export function getAllUserError(error) {
  return {
    type: GET_ALL_USER_ERROR,
    error,
  };
}

export function getUser(userid) {
  return {
    type: GET_USER,
    userid,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}
export function deleteUser(user) {
  return {
    type: DELETE_USER,
    user,
  };
}

export function deleteUserSuccess(response,methodtype) {
  return {
    type: DELETE_USER_SUCCESS,
    response,
    methodtype
  };
}

export function deleteUserError(error) {
  return {
    type: DELETE_USER_ERROR,
    error,
  };
}
export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}
export function onUserClear() {
  return {
    type: CLEAR,
  };
}
