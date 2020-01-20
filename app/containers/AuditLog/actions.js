/*
 *
 * Audit Log actions
 *
 */

import {
  GET_ALL_AUDITLOG,
  GET_ALL_AUDITLOG_SUCCESS,
  GET_ALL_AUDITLOG_ERROR
} from './constants';

export function getAllAuditLog() {
  return {
    type: GET_ALL_AUDITLOG
  };
}

export function getAllAuditLogSuccess(allAuditLog) {
  return {
    type: GET_ALL_AUDITLOG_SUCCESS,
    allAuditLog
  };
}

export function getAllAuditLogError(error) {
  return {
    type: GET_ALL_AUDITLOG_ERROR,
    error
  };
}
