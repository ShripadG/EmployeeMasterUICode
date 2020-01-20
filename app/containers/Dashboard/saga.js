import { call, select, takeLatest, put } from 'redux-saga/effects';
import {
  createHeadersWithAuth,
  createQueryString,
  requestPromise,
} from 'utils/request';
import request from 'utils/request';

import {
  GET_ALL_EMPLOYEE
} from './constants';
import {
  getAllEmployeeSuccess,
  getAllEmployeeError,
} from './actions';

import { EMPLOYEE_API_URL } from '../../utils/constants';

export function* getAllEmployee() {
  const requestURL = EMPLOYEE_API_URL;

  try {
    const response = yield call(request, requestURL);
    //console.log(response,'response')
    yield put(getAllEmployeeSuccess(response));
  } catch (err) {
    yield put(getAllEmployeeError(err));
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
}
