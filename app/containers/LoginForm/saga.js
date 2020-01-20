import { call, select, takeLatest, put } from 'redux-saga/effects';
import request, {
  createHeadersWithAuth,
  createQueryString,
  requestPromise,
} from 'utils/request';

import { push } from 'react-router-redux';

import { importDefaultSpecifier } from '@babel/types';
import { SUBMIT_LOGIN } from './constants';
import {
  actionLoginSuccess,
  actionLoginError,
  actionUserRight,
} from './actions';
// import { makeSelectEmployeeId, makeSelectEmployeeLoading } from './selectors';

import { LOGIN_URL, USER_RIGHT_URL } from '../../utils/constants';

export function* postLogin(res) {
  const requestURL = LOGIN_URL;

  const options = {};
  options.headers = {
    'Content-Type': 'application/json',
  };
  options.body = JSON.stringify({
    username: res.username.username,
    password: res.username.password,
  });
  options.method = 'POST';

  try {
    const response = yield call(requestPromise, requestURL, options);

    if (response) {
      if (response.id) {
        yield put(actionLoginSuccess(response));
        yield userRight();
        yield put(push('/dashboard'));
      } else {
        yield put(actionLoginError({ message: 'Invalid user or password' }));
      }
    }
  } catch (err) {
    yield put(actionLoginError(err));
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
  yield takeLatest(SUBMIT_LOGIN, postLogin);
}

export function* userRight() {
  const requestURL = USER_RIGHT_URL;

  const options = {};
  options.headers = {
    'Content-Type': 'application/json',
  };
  options.method = 'GET';

  try {
    const response = yield call(requestPromise, requestURL, options);
    if (response) {
      yield put(actionUserRight(response));
    } else {
      yield put(actionLoginError({ message: 'Login right service issue' }));
    }
  } catch (err) {
    yield put(actionLoginError(err));
  }
}
