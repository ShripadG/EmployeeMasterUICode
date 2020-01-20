import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectUser = state => state.registrationForm || initialState;
const makeSelectRegistrationForm = () =>
  createSelector(
    selectUser,
    substate => substate.toJS(),
  );

const makeSelectRegistrationUser = () =>
  createSelector(
    selectUser,
    state => state.get('user'),
  );

const makeSelectRegistrationResponse = () =>
  createSelector(
    selectUser,
    state => state.get('response'),
  );

export default makeSelectRegistrationForm;
export { makeSelectRegistrationUser, makeSelectRegistrationResponse };
