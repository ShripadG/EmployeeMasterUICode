/*
 *
 * ILCMaster actions
 *
 */

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
  CREATE_ILC_ERROR,
} from './constants';

export function getAllILC() {
  return {
    type: GET_ALL_ILC,
  };
}

export function getAllILCSuccess(allILC) {
  return {
    type: GET_ALL_ILC_SUCCESS,
    allILC,
  };
}

export function getAllILCError(error) {
  return {
    type: GET_ALL_ILC_ERROR,
    error,
  };
}

export function getILC(ILCid) {
  return {
    type: GET_ILC,
    ILCid,
  };
}

export function getILCSuccess(ILC) {
  return {
    type: GET_ILC_SUCCESS,
    ILC,
  };
}

export function getILCError(error) {
  return {
    type: GET_ILC_ERROR,
    error,
  };
}
export function clearILC() {
  return {
    type: CLEAR_ILC,
  };
}
export function onILCClear() {
  return {
    type: CLEAR,
  };
}
export function addILC(ILC) {
  return {
    type: CREATE_ILC,
    ILC,
  };
}

export function addILCSuccess(response,methodtype) {
  return {
    type: CREATE_ILC_SUCCESS,
    response,
    methodtype,
  };
}

export function addILCError(error) {
  return {
    type: CREATE_ILC_ERROR,
    error,
  };
}
