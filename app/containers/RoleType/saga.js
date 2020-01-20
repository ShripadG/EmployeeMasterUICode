import { call, select, takeLatest, put } from 'redux-saga/effects';
import request, { createHeadersWithAuth, requestPromise } from 'utils/request';

import { GET_ALL_ROLETYPE } from './constants';
import { getAllROLETYPESuccess, getAllROLETYPEError } from './actions';

import { USER_RIGHT_URL } from '../../utils/constants';

export function* getAllROLETYPE() {
  const requestURL = USER_RIGHT_URL;

  try {
    const response = yield call(request, requestURL);
    yield put(getAllROLETYPESuccess(response));
  } catch (err) {
    yield put(getAllROLETYPEError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* requestData() {
  yield takeLatest(GET_ALL_ROLETYPE, getAllROLETYPE);
}
