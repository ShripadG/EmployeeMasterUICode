import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectUser = state => state.changePassword || initialState;
const makeSelectChangePasswordLogin = () =>
  createSelector(
    selectUser,
    substate => substate.toJS(),
  );

const makeSelectChangePasswordUser = () =>
  createSelector(
    selectUser,
    state => state.get('user'),
  );

export default makeSelectChangePasswordLogin;
export { makeSelectChangePasswordUser }