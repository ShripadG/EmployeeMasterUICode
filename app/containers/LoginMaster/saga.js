import { call, select, takeLatest, put } from 'redux-saga/effects';
import { createHeadersWithAuth, requestPromise } from 'utils/request';
import request from 'utils/request';
import { push } from 'react-router-redux';

import { GET_ALL_USER, GET_USER, DELETE_USER } from './constants';
import {
  getAllUserSuccess,
  getAllUserError,
  getUserSuccess,
  getUserError,
  deleteUserSuccess,
  deleteUserError,
} from './actions';
import { makeSelectUserid, makeSelectUserLoading } from './selectors';

import { USER_API_URL, DELETE_USER_URL } from '../../utils/constants';

export function* getAllUser() {
  const requestURL = USER_API_URL;

  try {
    const response = yield call(request, requestURL);
    yield put(getAllUserSuccess(response));
  } catch (err) {
    yield put(getAllUserError(err));
  }
}
export function* getUser() {
  const userid = yield select(makeSelectUserid());
  const requestURL = USER_API_URL + '/id?id=' + userid;

  try {
    const response = yield call(request, requestURL);
    yield put(getUserSuccess(response));
    yield put(push('/registration'));
  } catch (err) {
    yield put(getUserError(err));
  }
}

export function* deleteUser(res) {
  const requestURL =
    DELETE_USER_URL + '?id=' + res.user.id + '&rev=' + res.user.rev;
  const options = createHeadersWithAuth('app123');
  options.body = JSON.stringify({ id: res.user.id, rev: res.user.rev });
  options.withCredentials = true;
  options.method = 'DELETE';
  try {
    const response = yield call(requestPromise, requestURL, options);
    yield put(deleteUserSuccess(response,options.method));
  } catch (err) {
    yield put(deleteUserError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* requestData() {
  yield takeLatest(GET_ALL_USER, getAllUser);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(DELETE_USER, deleteUser);
}
