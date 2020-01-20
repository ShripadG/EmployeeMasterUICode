// import { take, call, put, select } from 'redux-saga/effects';

import { call, select, takeLatest, put } from 'redux-saga/effects';
import {
  createHeadersWithAuth,
  createQueryString,
  requestPromise,
} from 'utils/request';
import request from 'utils/request';
import { push } from 'react-router-redux';

import { SUBMIT_REGISTRATION } from './constants';
import { actionRegistrationSuccess, actionRegistrationError } from './actions';
import { makeSelectLoginResponse } from '../LoginForm/selectors';

import { REGISTRATION_URL } from '../../utils/constants';
import { importDefaultSpecifier } from '@babel/types';

export function* postRegistration(res) {
  let requestURL = REGISTRATION_URL;
  const login_response = yield select(makeSelectLoginResponse());

  const options = createHeadersWithAuth('app123');

  let params = {
    emailID: res.user.EmailID,
    username: res.user.Username,
    type: res.user.Type,
  };

  if (res && res.user._id && res.user._rev) {
    requestURL = requestURL + '/EditDetails';
    (params.password = ''), (options.method = 'PUT');
  } else {
    requestURL = requestURL + '/Registration';
    (params.password = res.user.Password), (options.method = 'POST');
  }
  options.body = JSON.stringify(params);
  options.withCredentials = true;

  try {
    const response = yield call(requestPromise, requestURL, options);
    if (response) {
      yield put(actionRegistrationSuccess(response, options.method));

      if (login_response) {
        yield put(push('/login-master'));
      } else {
        yield put(push('/'));
      }
    }
  } catch (err) {
    yield put(actionRegistrationError(err));
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
  yield takeLatest(SUBMIT_REGISTRATION, postRegistration);
}
