import { call, select, takeLatest, put } from 'redux-saga/effects';
import { createHeadersWithAuth, requestPromise } from 'utils/request';
import { push } from 'react-router-redux';

import { CREATE_EMPLOYEE } from './constants';
import { addEmployeeSuccess, addEmployeeError } from './actions';
import { makeSelectEmployeeLoading } from './selectors';

import { EMPLOYEE_API_URL } from '../../utils/constants';

export function* postEmployee(res) {
  const loading = yield select(makeSelectEmployeeLoading());
  const requestURL = EMPLOYEE_API_URL;

  const options = createHeadersWithAuth('app123');
  options.body = JSON.stringify(res.employee);
  options.withCredentials = true;

  if (res.employee && res.employee._id && res.employee._rev) {
    options.method = 'PUT';
  } else {
    options.method = 'POST';
  }
  try {
    const response = yield call(requestPromise, requestURL, options);
    if (response && response.ok) {
      yield put(addEmployeeSuccess(response, options.method));
      yield put(push('/employee'));
    }
  } catch (err) {
    yield put(addEmployeeError(err));
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
  yield takeLatest(CREATE_EMPLOYEE, postEmployee);
}
