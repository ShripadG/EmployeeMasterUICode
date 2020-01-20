/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import employeeReducer from 'containers/Employee/reducer';
import employeeFormReducer from 'containers/EmployeeForm/reducer';
import dashboardReducer from 'containers/Dashboard/reducer';
import loginReducer from 'containers/LoginForm/reducer';
import registrationReducer from 'containers/RegistrationForm/reducer';
import loginmasterReducer from 'containers/LoginMaster/reducer';
import changePasswordReducer from 'containers/ChangePassword/reducer';
import ILCMasterReducer from 'containers/ILCMaster/reducer';
import roleTypeReducer from 'containers/RoleType/reducer';
import auditLogReducer from 'containers/AuditLog/reducer';
import { reducer as form } from 'redux-form/immutable';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    employee: employeeReducer,
    employeeForm: employeeFormReducer,
    loginForm: loginReducer,
    registrationForm: registrationReducer,
    loginmaster: loginmasterReducer,
    changePassword: changePasswordReducer,
    dashboard: dashboardReducer,
    ilcMaster: ILCMasterReducer,
    allAuditLog: auditLogReducer,
    roletype: roleTypeReducer,
    router: connectRouter(history),
    form,
    ...injectedReducers,
  });

  return rootReducer;
}
