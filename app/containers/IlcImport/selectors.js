import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ilcImport state domain
 */

const selectIlcImportDomain = state => state.ilcImport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IlcImport
 */

const makeSelectIlcImport = () =>
  createSelector(
    selectIlcImportDomain,
    substate => substate,
  );

export default makeSelectIlcImport;
export { selectIlcImportDomain };
