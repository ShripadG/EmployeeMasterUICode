import { call, select, takeLatest, put } from 'redux-saga/effects';
import {
  createHeadersWithAuth,
  requestPromise,
} from 'utils/request';
import request from 'utils/request';
import { push } from 'react-router-redux';

import {
  GET_ALL_EMPLOYEE,
  GET_EMPLOYEE,
  DELETE_EMPLOYEE,
} from './constants';
import {
  getAllEmployeeSuccess,
  getAllEmployeeError,
  getEmployeeSuccess,
  getEmployeeError,
  deleteEmployeeSuccess,
  deleteEmployeeError,
} from './actions';
import { makeSelectEmployeeId, makeSelectEmployeeLoading } from './selectors';

import { EMPLOYEE_API_URL } from '../../utils/constants';

export function* getAllEmployee() {
  const requestURL = EMPLOYEE_API_URL;

  try {
    const response = yield call(request, requestURL);
    yield put(getAllEmployeeSuccess(response));
  } catch (err) {
    yield put(getAllEmployeeError(err));
  }
}
export function* getEmployee() {
  const empid = yield select(makeSelectEmployeeId());
  const requestURL = EMPLOYEE_API_URL + '/id?id=' + empid;

  try {
    const response = yield call(request, requestURL);
    yield put(getEmployeeSuccess(response));
    yield put(push('/employee-form'));
  } catch (err) {
    yield put(getEmployeeError(err));
  }
}

export function* deleteEmployee(res) {
  const requestURL = API_EMPLOYEE_API_URLURL;
  const options = createHeadersWithAuth('app123');
  options.body = JSON.stringify({ id: res.empid, rev: res.revid });
  options.withCredentials = true;
  options.method = 'DELETE';
  try {
    const response = yield call(requestPromise, requestURL, options);
    yield put(deleteEmployeeSuccess(response));
  } catch (err) {
    yield put(deleteEmployeeError(err));
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
  yield takeLatest(GET_ALL_EMPLOYEE, getAllEmployee);
  yield takeLatest(GET_EMPLOYEE, getEmployee);
  yield takeLatest(DELETE_EMPLOYEE, deleteEmployee);
}
