import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardDomain = state => state.dashboard || initialState;


const makeSelectAllEmployee = () =>
  createSelector(
    selectDashboardDomain,
    state => state.get('allemployee'),
  );

/**
 * Direct selector to the dashboard state domain
 */


/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );

export default makeSelectDashboard;
export { makeSelectDashboard, makeSelectAllEmployee };
