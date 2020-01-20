import { call, takeLatest, put } from 'redux-saga/effects';

import request from 'utils/request';

import {
  GET_ALL_AUDITLOG
} from './constants';
import {
  getAllAuditLogSuccess,
  getAllAuditLogError
} from './actions';

import { AUDIT_LOG_API_URL } from '../../utils/constants';

export function* getAllAuditLog() {
  const requestURL = AUDIT_LOG_API_URL;
  try {
    const response = yield call(request, requestURL);
    yield put(getAllAuditLogSuccess(response));
  } catch (err) {
    yield put(getAllAuditLogError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* requestData() {
  // Watches for GET_ALL_EMPLOYEE actions and calls getAllEmployee when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_ALL_AUDITLOG, getAllAuditLog);
}
