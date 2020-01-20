import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectILC = state => state.ilcMaster || initialState;
const makeSelectILCMaster = () =>
  createSelector(
    selectILC,
    substate => substate.toJS(),
  );

const makeSelectAllILC = () =>
  createSelector(
    selectILC,
    state => state.get('allILC'),
  );

const makeSelectOneILC = () =>
  createSelector(
    selectILC,
    state => state.get('ILC'),
  );

const makeSelectILCid = () =>
  createSelector(
    selectILC,
    state => state.get('ILCid'),
  );

const makeSelectILCLoading = () =>
  createSelector(
    selectILC,
    state => state.get('loading'),
  );

const makeSelectILCActionType = () =>
  createSelector(
    selectILC,
    state => state.get('actiontype'),
  );

const makeSelectILCApiResponse = () =>
  createSelector(
    selectILC,
    state => state.get('response'),
  );

const makeSelectILCMethodType = () =>
  createSelector(
    selectILC,
    state => state.get('methodtype'),
  );

export default makeSelectILCMaster;
export {
  makeSelectAllILC,
  makeSelectOneILC,
  makeSelectILCid,
  makeSelectILCLoading,
  makeSelectILCActionType,
  makeSelectILCApiResponse,
  makeSelectILCMethodType,
};
