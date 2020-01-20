import { call, select, takeLatest, put } from 'redux-saga/effects';
import request, { createHeadersWithAuth, requestPromise } from 'utils/request';

import { push } from 'react-router-redux';

import { GET_ALL_ILC, GET_ILC, CREATE_ILC } from './constants';
import {
  getAllILCSuccess,
  getAllILCError,
  getILCSuccess,
  getILCError,
  addILCSuccess,
  addILCError
} from './actions';
import { makeSelectILCid, makeSelectILCLoading } from './selectors';

import { ILC_API_URL } from '../../utils/constants';

export function* getAllILC() {
  const requestURL = ILC_API_URL;

  try {
    const response = yield call(request, requestURL);
    yield put(getAllILCSuccess(response));
  } catch (err) {
    yield put(getAllILCError(err));
  }
}
export function* getILC() {
  const ilcid = yield select(makeSelectILCid());
  const requestURL = `${ILC_API_URL}/id?id=${ilcid}`;

  try {
    const response = yield call(request, requestURL);
    yield put(getILCSuccess(response));
    yield put(push('/ilc-form'));
  } catch (err) {
    yield put(getILCError(err));
  }
}

export function* addILC(res) {
  const requestURL = `${CREATE_ILC_URL}?id=${res.user.id}&rev=${res.user.rev}`;
  const options = createHeadersWithAuth('app123');
  options.body = JSON.stringify({ id: res.user.id, rev: res.user.rev });
  options.withCredentials = true;
  options.method = 'PUT';
  try {
    const response = yield call(requestPromise, requestURL, options);
    yield put(addILCSuccess(response, options.method));
  } catch (err) {
    yield put(addILCError(err));
  }
}

export function* postILC(res) {
  const loading = yield select(makeSelectILCLoading());
  const requestURL = ILC_API_URL;

  const options = createHeadersWithAuth('app123');
  options.body = JSON.stringify(res.ILC);
  options.withCredentials = true;

  if (res.ILC && res.ILC._id && res.ILC._rev) {
    options.method = 'PUT';
  } else {
    options.method = 'POST';
  }
  try {
    const response = yield call(requestPromise, requestURL, options);
    if (response && response.ok) {
      yield put(addILCSuccess(response, options.method));
      yield put(push('/ilc-master'));
    }
  } catch (err) {
    yield put(addILCError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* requestData() {
  yield takeLatest(GET_ALL_ILC, getAllILC);
  yield takeLatest(GET_ILC, getILC);
  yield takeLatest(CREATE_ILC, postILC);
}
