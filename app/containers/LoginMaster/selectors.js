import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectUser = state => state.loginmaster || initialState; 
const makeSelectLoginMaster = () =>
  createSelector(
    selectUser,
    substate => substate.toJS(),
  );

const makeSelectAllUser = () =>
  createSelector(
    selectUser,
    state => state.get('alluser'),
  );

const makeSelectUser = () =>
  createSelector(
    selectUser,
    state => state.get('user'),
  );

const makeSelectUsername = () =>
  createSelector(
    selectUser,
    state => state.get('username'),
  );

const makeSelectUserid = () =>
  createSelector(
    selectUser,
    state => state.get('userid'),
  );

const makeSelectUserLoading = () =>
  createSelector(
    selectUser,
    state => state.get('loading'),
  );

const makeSelectUserActionType = () =>
  createSelector(
    selectUser,
    state => state.get('actiontype'),
  );

const makeSelectUserApiResponse = () =>
  createSelector(
    selectUser,
    state => state.get('response'),
  );

const makeSelectUserMethodType = () =>
  createSelector(
    selectUser,
    state => state.get('methodtype'),
  );

export default makeSelectLoginMaster;
export {
  makeSelectUser,
  makeSelectAllUser,
  makeSelectUsername,
  makeSelectUserid,
  makeSelectUserLoading,
  makeSelectUserActionType,
  makeSelectUserApiResponse,
  makeSelectUserMethodType,
};
