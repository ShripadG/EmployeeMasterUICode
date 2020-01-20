/**
 * Direct selector to the roleType state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectROLETYPE = state => state.roletype || initialState;

const makeSelectRoleType = () =>
  createSelector(
    selectROLETYPE,
    substate => substate.toJS(),
  );

const makeSelectAllROLETYPE = () =>
  createSelector(
    selectROLETYPE,
    state => state.get('allROLETYPE'),
  );
export default makeSelectRoleType;
export { makeSelectAllROLETYPE };
