import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectUser = state => state.loginForm || initialState;
const makeSelectLoginForm = () =>
  createSelector(
    selectUser,
    substate => substate.toJS(),
  );

const makeSelectLoginResponse = () =>
  createSelector(
    selectUser,
    state => state.get('response'),
  );

const makeSelectLoginError = () =>
  createSelector(
    selectUser,
    state => state.get('error'),
  );

const makeSelectUserRightResponse = () =>
  createSelector(
    selectUser,
    state => state.get('user_right'),
  );

const makeSelectLoggedInUserName = () =>
  createSelector(
    selectUser,
    state => state.get('username'),
  );

export default makeSelectLoginForm;
export {
  makeSelectLoginResponse,
  makeSelectLoginError,
  makeSelectUserRightResponse,
  makeSelectLoggedInUserName,
};
