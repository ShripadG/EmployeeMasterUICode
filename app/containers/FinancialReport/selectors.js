import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the financialReport state domain
 */

const selectFinancialReportDomain = state => state.financialReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by financialReport
 */

const makeSelectFinancialReport = () =>
  createSelector(
    selectFinancialReportDomain,
    substate => substate,
  );

export default makeSelectFinancialReport;
export { selectFinancialReportDomain };
