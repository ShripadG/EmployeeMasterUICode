import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectAuditLog = state => state.allAuditLog || initialState; //state => state.get('auditlog', initialState);

const makeSelectAuditLog = () =>
  createSelector(
    selectEmp,
    substate => substate.toJS(),
  );

const makeSelectAllAuditLog = () =>
  createSelector(
    selectAuditLog,
    state => state.get('allAuditLog')
  );

const makeSelectAuditLogLoading = () =>
  createSelector(
    selectAuditLog,
    state => state.get('loading')
  );

const makeSelectAuditLogApiResponse = () =>
  createSelector(
    selectAuditLog,
    state => state.get('response')
  );

export default makeSelectAuditLog;
export {
  makeSelectAllAuditLog,
  makeSelectAuditLogLoading,
  makeSelectAuditLogApiResponse
};
