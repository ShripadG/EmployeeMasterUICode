import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectEmp = state => state.employee || initialState;
const makeSelectEmpl = () =>
  createSelector(
    selectEmp,
    substate => substate.toJS(),
  );

const makeSelectAllEmployee = () =>
  createSelector(
    selectEmp,
    state => state.get('allemployee'),
  );

const makeSelectEmployee = () =>
  createSelector(
    selectEmp,
    state => state.get('employee'),
  );

const makeSelectEmployeeId = () =>
  createSelector(
    selectEmp,
    state => state.get('empid'),
  );

const makeSelectEmployeeLoading = () =>
  createSelector(
    selectEmp,
    state => state.get('loading'),
  );

const makeSelectEmployeeActionType = () =>
  createSelector(
    selectEmp,
    state => state.get('actiontype'),
  );

const makeSelectEmployeeApiResponse = () =>
  createSelector(
    selectEmp,
    state => state.get('response'),
  );

export default makeSelectEmpl;
export {
  makeSelectEmployee,
  makeSelectAllEmployee,
  makeSelectEmployeeId,
  makeSelectEmployeeLoading,
  makeSelectEmployeeActionType,
  makeSelectEmployeeApiResponse,
};
