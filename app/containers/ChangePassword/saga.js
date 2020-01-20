// import { take, call, put, select } from 'redux-saga/effects';

import { call, select, takeLatest, put } from 'redux-saga/effects';
import {
  createHeadersWithAuth,
  createQueryString,
  requestPromise,
} from 'utils/request';
import request from 'utils/request';
import { push } from 'react-router-redux';

import { SUBMIT_CHANGEPASSWORD } from './constants';
import {
  actionChangePasswordSuccess,
  actionChangePasswordError,
} from './actions';
import { makeSelectLoginResponse } from '../LoginForm/selectors';

import { REGISTRATION_URL } from '../../utils/constants';

export function* postChangePassword(res) {
  const requestURL = REGISTRATION_URL+'/Changepassword';
  const login_response = yield select(makeSelectLoginResponse());

  const options = createHeadersWithAuth('app123');

  // let params = {
  //   emailID: res.user.EmailID,
  //   username: res.user.Username,
  //   password: res.user.Password,
  //   type: res.user.Type,
  //   id: login_response.id,
  //   _id: login_response.id,
  //   _rev: login_response.rev,
  // };

  //console.log(res,'res')
  let params = {
    username: res.user.username,
    password: res.user.Password,
  };

  options.body = JSON.stringify(params);
  options.withCredentials = true;
  options.method = 'PUT';

  //console.log(login_response,res,params, 'params');

  try {
    const response = yield call(requestPromise, requestURL, options);
    if (response) {
      yield put(actionChangePasswordSuccess(response, options.method));
      yield put(push('/'));
    }
  } catch (err) {
    yield put(actionChangePasswordError(err));
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
  yield takeLatest(SUBMIT_CHANGEPASSWORD, postChangePassword);
}
