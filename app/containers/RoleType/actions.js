/*
 *
 * RoleType actions
 *
 */

import {
  GET_ALL_ROLETYPE,
  GET_ALL_ROLETYPE_SUCCESS,
  GET_ALL_ROLETYPE_ERROR,
} from './constants';

export function getAllROLETYPE() {
  return {
    type: GET_ALL_ROLETYPE,
  };
}

export function getAllROLETYPESuccess(allROLETYPE) {
  return {
    type: GET_ALL_ROLETYPE_SUCCESS,
    allROLETYPE,
  };
}

export function getAllROLETYPEError(error) {
  return {
    type: GET_ALL_ROLETYPE_ERROR,
    error,
  };
}