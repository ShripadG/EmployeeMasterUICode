import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import '../../css/employee.css';
import '../../css/app.css';
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError,
} from 'redux-form/immutable';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import saga from './saga';
import { push } from 'react-router-redux';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { makeSelectLoginResponse } from '../LoginForm/selectors';

Moment.locale('en');
momentLocalizer();

import { addEmployee } from './actions';

import { makeSelectEmployee } from '../Employee/selectors';

import { makeSelectLoggedInUserName } from '../LoginForm/selectors';

import 'react-widgets/dist/css/react-widgets.css';

const form = 'employeeForm';

const renderField = ({
  input,
  type,
  disabled,
  meta: { touched, error },
  PlaceholderText,
}) => (
  <div>
    <input
      {...input}
      disabled={disabled}
      className="form-control"
      type={type}
      placeholder={PlaceholderText}
    />
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error },
  children,
}) => (
  <div>
    <select {...input} className="custom-dropdown form-control" type={type}>
      {children}
    </select>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

export const numberValue = value =>
  value && !/^(\d*\.)?\d+$/igm.test(value)
    ? 'please enter numeric value'
    : ''

import {
  setDateFormat,
  setDateFormatApi,
  setDateTimeFormate,
} from 'utils/commonMethods';

const renderDateTimePicker = function(params) {
  let dateInput = setDateFormat(params.input.value);

  return (
    <div>
      <DateTimePicker
        {...params.input}
        onChange={params.input.onChange}
        disabled={params.disabled}
        format="DD-MM-YYYY"
        time={params.showTime}
        containerClassName="fa-datepicker"
        max={params.max}
        min={params.min}
        value={Moment(dateInput).isValid() ? new Date(dateInput) : null}
      />
      {params.meta.touched && params.meta.error && (
        <span className="error">{params.meta.error}</span>
      )}
    </div>
  );
};

const renderDatePicker = function(params) {
  if (
    (params.input.value && typeof params.input.value === 'object') ||
    params.input.value.indexOf('-') != -1
  ) {
    var dateInput = setDateTimeFormate(params.input.value);
  } else {
    var dateInput = setDateFormat(params.input.value);
  }
  return (
    <div>
      <DateTimePicker
        {...params.input}
        onChange={params.input.onChange}
        disabled={params.disabled}
        format="DD-MM-YYYY"
        time={params.showTime}
        containerClassName="fa-datepicker"
        max={params.max}
        min={params.min}
        value={Moment(dateInput).isValid() ? new Date(dateInput) : null}
        //value={Moment(dateInput).isValid() ? new Date(Moment(dateInput, 'MM/DD/YYYY')) : null}
      />
      {params.meta.touched && params.meta.error && (
        <span className="error">{params.meta.error}</span>
      )}
    </div>
  );
};

const radioButtonErrorGenerator = ({
  input,
  meta: { touched, error, warning },
}) => <div>{touched && error && <span className="error">{error}</span>}</div>;

function validate(formProps, props) {
  const alldata = JSON.parse(JSON.stringify(formProps));
  const errors = {};

  if (!alldata.CID) {
    errors.CID = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.EmployeeName) {
    errors.EmployeeName = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.IBMEmailID) {
    errors.IBMEmailID = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.NationwideEmailID) {
    errors.NationwideEmailID = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(alldata.NationwideEmailID)
  ) {
    errors.NationwideEmailID = 'Invalid email address';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.Gender) {
    errors.Gender = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.Status) {
    errors.Status = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.RoleAtIBM) {
    errors.RoleAtIBM = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.ContractService) {
    errors.ContractService = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.DGDC) {
    errors.DGDC = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.DGDCSquad) {
    errors.DGDCSquad = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.PortfolioLeadOffshore) {
    errors.PortfolioLeadOffshore = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.Country) {
    errors.Country = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.LOB) {
    errors.LOB = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.EmployeeType) {
    errors.EmployeeType = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.WorkLocation) {
    errors.WorkLocation = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.CurrentWorkLocation) {
    errors.CurrentWorkLocation = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.LocationStatus) {
    errors.LocationStatus = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.BandonJoiningNationwide) {
    errors.BandonJoiningNationwide = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.CurrentBand) {
    errors.CurrentBand = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }
  if (!alldata.AccountOnboardDate) {
    errors.AccountOnboardDate = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }

  if (!alldata.IBMID) {
    errors.IBMID = 'This field cannot be empty';
    errors.isFirstTabInvalid = true;
  }

  if (!alldata.Billable) {
    errors.Billable = 'This field cannot be empty';
  }
  if (!alldata.FTE) {
    errors.FTE = 'This field cannot be empty';
  } else if (alldata.FTE < 0 || alldata.FTE > 100) {
    errors.FTE = 'Value must be between 0 to 100';
  }
  if (!alldata.WeeklyHours) {
    errors.WeeklyHours = 'This field cannot be empty';
  } else if (alldata.WeeklyHours < 0) {
    errors.WeeklyHours = 'Minimum value should be 0';
  }
  if (!alldata.RoleLevel) {
    errors.RoleLevel = 'This field cannot be empty';
  }
  if (
    !alldata.DailyRatePrice &&
    (alldata.Billable === 'Y' || alldata.Billable === 'P')
  ) {
    errors.DailyRatePrice = 'This field cannot be empty';
  } else if (alldata.DailyRatePrice < 0) {
    errors.DailyRatePrice = 'Minimum value should be 0';
  }
  if (!alldata.DailyCost) {
    errors.DailyCost = 'This field cannot be empty';
  } else if (alldata.DailyCost < 0) {
    errors.DailyCost = 'Minimum value should be 0';
  }

  return errors;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'Employeedetails',
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
    }
    if (this.props.employee) {
      this.props.initialize(this.props.employee);
    } else {
      this.props.initialize({});
    }
  }

  clearForm = () => {
    this.props.initialize({});
    this.props.history.push('/employee');
  };

  onSubmitForm(values) {
    //console.log(this.props.loggedInUserName.username,'this.props.login_response');return false;
    return sleep(10)
      .then(() => validate(values, this.props, this))
      .then(errors => {
        const countErr = Object.keys(errors).length;
        if (countErr > 0) {
          if (errors.isFirstTabInvalid) {
            this.setState({ key: 'Employeedetails' });
          } else {
            this.setState({ key: 'employeebillingdetails' });
          }
          throw new SubmissionError(errors);
        } else {
          //final submit
          let alldata = JSON.parse(JSON.stringify(values));
          alldata.AccountOnboardDate = setDateFormatApi(
            alldata.AccountOnboardDate,
          );

          alldata.AccountOffboardingOffboardedDate = setDateFormatApi(
            alldata.AccountOffboardingOffboardedDate,
          );
          alldata.OffboardingReqRecdDate = setDateFormatApi(
            alldata.OffboardingReqRecdDate,
          );
          
          alldata.LoginID = this.props.loggedInUserName.username;
          alldata.RowAddedDate =
            Moment(new Date()).format('DD-MM-YYYY') + ' 00:00:00';
          this.props.postSubmit(alldata);
        }
      });
  }

  render() {
    const { show, datamodel, error, handleSubmit, submitting } = this.props;
    const { serverError, saving } = this.state;

    const isNew = !this.props.datamodel;

    return (
      <div className="employee-form background-image">
        <div className="menu">
          <Button
            size="sm"
            className="btn btn-primary"
            onClick={() => this.props.dispatch(push('/dashboard'))}
          >
            Go To Dashboard
          </Button>
          <Button
            size="sm"
            className="btn btn-warning"
            onClick={() => this.props.dispatch(push('/employee'))}
          >
            Go To Employee Listing
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(this.onSubmitForm)}
          autoComplete="off"
          className="form-inline"
        >
          <Tabs
            id="employeetabs"
            activeKey={this.state.key}
            onSelect={key => this.setState({ key })}
          >
            <Tab eventKey="Employeedetails" title="Employee details">
              <div className="p-4" id="result">
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>IBMID:</label>
                      <Field
                        name="IBMID"
                        type="text"
                        component={renderField}
                        PlaceholderText="IBMID"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>C-ID:</label>
                      <Field
                        name="CID"
                        type="text"
                        component={renderField}
                        PlaceholderText="C-ID"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>HCAM-ID:</label>
                      <Field
                        name="HCAMID"
                        type="text"
                        component={renderField}
                        PlaceholderText="HCAM-ID"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Employee Name:</label>
                      <Field
                        name="EmployeeName"
                        type="text"
                        component={renderField}
                        PlaceholderText="Employee Name"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>IBM Email ID:</label>
                      <Field
                        name="IBMEmailID"
                        type="text"
                        component={renderField}
                        PlaceholderText="IBM Email ID"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Nationwide Email ID:</label>
                      <Field
                        name="NationwideEmailID"
                        type="text"
                        component={renderField}
                        PlaceholderText="Nationwide Email ID"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Gender:</label>
                      <Field
                        name="Gender"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Status:</label>
                      <Field
                        name="Status"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Yet to Join">Yet to Join</option>
                        <option value="Onboarded">Onboarded</option>
                        <option value="Offboarded">Offboarded</option>
                        <option value="Offboarding">Offboarding</option>
                        <option value="Onboarding">Onboarding</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Role@IBM:</label>
                      <Field
                        name="RoleAtIBM"
                        type="text"
                        component={renderField}
                        PlaceholderText="Role@IBM"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Contract/Service:</label>
                      <Field
                        name="ContractService"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="DCDG">DCDG</option>
                        <option value="Testing">Testing</option>
                        <option value="Cross">Cross</option>
                        <option value="Other Program">Other Program</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>DG/DC:</label>
                      <Field
                        name="DGDC"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="AD - Central"> AD - Central</option>
                        <option value="BDC">BDC</option>
                        <option value="BDC R15 Release">BDC R15 Release</option>
                        <option value="CDC">CDC</option>
                        <option value="Channel Squad">Channel Squad</option>
                        <option value="COE DG">COE DG</option>
                        <option value="Core Test Services">
                          Core Test Services
                        </option>
                        <option value="Core Test Services PMO">
                          Core Test Services PMO
                        </option>
                        <option value="Cross Account">Cross Account</option>
                        <option value="DCDG - PMO">DCDG - PMO</option>
                        <option value="Digital PMO">Digital PMO</option>
                        <option value="Digital Portfolio">
                          Digital Portfolio
                        </option>
                        <option value="FinHRDC">FinHRDC</option>
                        <option value="Group Functions PMO">
                          Group Functions PMO
                        </option>
                        <option value="HCM 8.57 Upgrade">
                          HCM 8.57 Upgrade
                        </option>
                        <option value="Home Hub-Mortgages">
                          Home Hub-Mortgages
                        </option>
                        <option value="IMDC">IMDC</option>
                        <option value="INPUT - Operations">
                          INPUT - Operations
                        </option>
                        <option value="Input Operations">
                          Input Operations
                        </option>
                        <option value="Leadership+Misc">Leadership+Misc</option>
                        <option value="Mattsoft">Mattsoft</option>
                        <option value="MDC">MDC</option>
                        <option value="MDC, Project TMW Digital">
                          MDC, Project TMW Digital
                        </option>
                        <option value="My Nationwide">My Nationwide</option>
                        <option value="Nationwide for Business">
                          Nationwide for Business
                        </option>
                        <option value="NBS Programme">NBS Programme</option>
                        <option value="NEM HST">NEM HST</option>
                        <option value="NEMDC">NEMDC</option>
                        <option value="Offshore DG Lead">
                          Offshore DG Lead
                        </option>
                        <option value="Offshore Workstream Lead">
                          Offshore Workstream Lead
                        </option>
                        <option value="Onshore DG Lead">Onshore DG Lead</option>
                        <option value="Origination">Origination</option>
                        <option value="Origination- EDB">
                          Origination- EDB
                        </option>
                        <option value="Payments PMO">Payments PMO</option>
                        <option value="PDC">PDC</option>
                        <option value="PMO">PMO</option>
                        <option value="POWDC">POWDC</option>
                        <option value="Project Application Support">
                          Project Application Support
                        </option>
                        <option value="Project BCBS 239">
                          Project BCBS 239
                        </option>
                        <option value="Project Business Operations&Readiness">
                          Project Business Operations&Readiness
                        </option>
                        <option value="Project CAPA Debit Replacement">
                          Project CAPA Debit Replacement
                        </option>
                        <option value="Project CAPA Debit Replacement, Mocha & Project FCA Credit Card">
                          Project CAPA Debit Replacement, Mocha & Project FCA
                          Credit Card
                        </option>
                        <option value="Project Confirmation of Payee">
                          Project Confirmation of Payee
                        </option>
                        <option value="Project DAM Replacement">
                          Project DAM Replacement
                        </option>
                        <option value="Project Employee Rewards">
                          Project Employee Rewards
                        </option>
                        <option value="Project Everyday Banking">
                          Project Everyday Banking
                        </option>
                        <option value="Project GDPR">Project GDPR</option>
                        <option value="Project IAM Maturity">
                          Project IAM Maturity
                        </option>
                        <option value="Project IDV&A">Project IDV&A</option>
                        <option value="Project IMAS">Project IMAS</option>
                        <option value="Project IMAS - MLR">
                          Project IMAS - MLR
                        </option>
                        <option value="Project IMAS Change POD">
                          Project IMAS Change POD
                        </option>
                        <option value="Project Industry Testing">
                          Project Industry Testing
                        </option>
                        <option value="Project Member Credit Card">
                          Project Member Credit Card
                        </option>
                        <option value="Project Mobile Resilience Program">
                          Project Mobile Resilience Program
                        </option>
                        <option value="Project Money Laundering Regulations">
                          Project Money Laundering Regulations
                        </option>
                        <option value="Project Mortgages POD">
                          Project Mortgages POD
                        </option>
                        <option value="Project Open Banking">
                          Project Open Banking
                        </option>
                        <option value="Project Payment Platform Upgrade">
                          Project Payment Platform Upgrade
                        </option>
                        <option value="Project Payware Replacement">
                          Project Payware Replacement
                        </option>
                        <option value="Project PCI DSS">Project PCI DSS</option>
                        <option value="Project RTB">Project RTB</option>
                        <option value="Project SAP Maintenance">
                          Project SAP Maintenance
                        </option>
                        <option value="Project Savings POD">
                          Project Savings POD
                        </option>
                        <option value="Project Telephone Banking Passcode">
                          Project Telephone Banking Passcode
                        </option>
                        <option value="Project TMW Digital">
                          Project TMW Digital
                        </option>
                        <option value="Project UHS">Project UHS</option>
                        <option value="Project UHS, Project Child trust fund">
                          Project UHS, Project Child trust fund
                        </option>
                        <option value="Project Visa Disputes System Replacement">
                          Project Visa Disputes System Replacement
                        </option>
                        <option value="RPDG PMO">RPDG PMO</option>
                        <option value="SDC">SDC</option>
                        <option value="Service - Fixed">Service - Fixed</option>
                        <option value="Service Integration Squad">
                          Service Integration Squad
                        </option>
                        <option value="SIS">SIS</option>
                        <option value="Support">Support</option>
                        <option value="Others">Others</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>DG/DC (GD use only)/Squad:</label>
                      <Field
                        name="DGDCSquad"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Digital Portfolio">
                          Digital Portfolio
                        </option>
                        <option value="AD - Central">AD - Central</option>
                        <option value="Central Communities Portfolio">
                          Central Communities Portfolio
                        </option>
                        <option value="Channel Squad">Channel Squad</option>
                        <option value="COE DG">COE DG</option>
                        <option value="Core Test Services">Core Test Services</option>
                        <option value="Cross">Cross</option>
                        <option value="Cross Account">Cross Account</option>
                        <option value="Data and Analytics Squad">Data and Analytics Squad</option>
                        <option value="DCDG">DCDG</option>
                        <option value="DCDG - PMO">DCDG - PMO</option>
                        <option value="Digital and Mortgages Squad">
                          Digital and Mortgages Squad
                        </option>
                        <option value="Digital Portfolio">
                          Digital Portfolio
                        </option>
                        <option value="DOT">
                          DOT
                        </option>
                        <option value="DOT - EDB">
                          DOT - EDB
                        </option>
                        <option value="INPUT - Operations">
                          INPUT - Operations
                        </option>
                        <option value="My Nationwide">
                        My Nationwide
                        </option>
                        <option value="Nationwide for Business">Nationwide for Business</option>
                        <option value="NBS Programme">NBS Programme</option>
                        <option value="Others">Others</option>
                        <option value="Products and Proposition Squad">
                          Products and Proposition Squad
                        </option>
                        <option value="Payments Squad">
                          Payments Squad
                        </option>
                        <option value="Regulated Advice Squad">
                        Regulated Advice Squad
                        </option>
                        <option value="Retail Heritage Squad">
                          Retail Heritage Squad
                        </option>
                        <option value="Risk Squad">
                        Risk Squad
                        </option>
                        <option value="Security Squad">Security Squad</option>
                        <option value="Service - Fixed">Service - Fixed</option>
                        <option value="Service Integration Squad">Service Integration Squad</option>
                        <option value="Simplification and Automation Squad">Simplification and Automation Squad</option>
                        <option value="SIS">SIS</option>
                        <option value="Support">Support</option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Portfolio Lead Offshore:</label>
                      <Field
                        name="PortfolioLeadOffshore"
                        type="text"
                        component={renderField}
                        PlaceholderText="Portfolio Lead Offshore"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Country:</label>
                      <Field
                        name="Country"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="India">India</option>
                        <option value="UK">UK</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>LOB:</label>
                      <Field
                        name="LOB"
                        type="text"
                        component={renderField}
                        PlaceholderText="LOB"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Employee Type:</label>
                      <Field
                        name="EmployeeType"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="DRC">DRC</option>
                        <option value="Regular">Regular</option>
                        <option value="Regular-CIC">Regular-CIC</option>
                        <option value="Regular-ISL">Regular-ISL</option>
                        <option value="SSP">SSP</option>
                        <option value="SSP-CIC">SSP-CIC</option>
                        <option value="TSC">TSC</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Work Location:</label>
                      <Field
                        name="WorkLocation"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="pune">pune</option>
                        <option value="Swindon">Swindon</option>
                        <option value="london">london</option>
                        <option value="Bournemouth">Bournemouth</option>
                        <option value="Northampton">Northampton</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Current work location:</label>
                      <Field
                        name="CurrentWorkLocation"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="pune">pune</option>
                        <option value="Swindon">Swindon</option>
                        <option value="london">london</option>
                        <option value="Bournemouth">Bournemouth</option>
                        <option value="Northampton">Northampton</option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Location Status:</label>
                      <Field
                        name="LocationStatus"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Onshore">Onshore</option>
                        <option value="Offshore">Offshore</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Landed-HCAM or IA ?:</label>
                      <Field
                        name="LandedHCAMorIA"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="HCAM">HCAM</option>
                        <option value="IA">IA</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Band on Joining Nationwide:</label>
                      <Field
                        name="BandonJoiningNationwide"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="D">D</option>
                        <option value="C">C</option>
                        <option value="B">B</option>
                        <option value="A">A</option>
                        <option value="6G">6G</option>
                        <option value="6A">6A</option>
                        <option value="6B">6B</option>
                        <option value="7A">7A</option>
                        <option value="7B">7B</option>
                      </Field>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Account Onboard Date:</label>

                      <Field
                        name="AccountOnboardDate"
                        showTime={false}
                        defaultValue={new Date()}
                        component={renderDatePicker}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Current Band:</label>
                      <Field
                        name="CurrentBand"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="D">D</option>
                        <option value="C">C</option>
                        <option value="B">B</option>
                        <option value="A">A</option>
                        <option value="6G">6G</option>
                        <option value="6A">6A</option>
                        <option value="6B">6B</option>
                        <option value="7A">7A</option>
                        <option value="7B">7B</option>
                      </Field>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Account Offboarding Date:</label>
                      <Field
                        name="AccountOffboardingOffboardedDate"
                        showTime={false}
                        max={new Date()}
                        defaultValue={new Date()}
                        component={renderDatePicker}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Offboarding Request Received Date:</label>

                      <Field
                        name="OffboardingReqRecdDate"
                        showTime={false}
                        max={new Date()}
                        defaultValue={new Date()}
                        component={renderDatePicker}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Reason for Leaving:</label>
                      <Field
                        name="ReasonforLeaving"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Attrition">Attrition</option>
                        <option value="Planned Roll-Off">
                          Planned Roll-Off
                        </option>
                        <option value="Medical">Medical</option>
                        <option value="LOA">LOA</option>
                        <option value="ML">ML</option>
                      </Field>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Source of Information:</label>
                      <Field
                        name="SourceofInformation"
                        type="text"
                        component={renderField}
                        PlaceholderText="Source of Information"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Remarks:</label>
                      <Field
                        name="Remarks"
                        type="text"
                        component={renderField}
                        PlaceholderText="Remarks"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              eventKey="employeebillingdetails"
              title="Employee billing details"
            >
              <div className="p-4" id="result">
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Client Billable:</label>
                      <Field
                        name="Billable"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="Y">Y - Yes</option>
                        <option value="N">N - No</option>
                        <option value="P">P - Partial</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>FTE (%):</label>
                      <Field
                        name="FTE"
                        type="text"
                        component={renderField}
                        PlaceholderText="FTE"
                        validate={[numberValue]}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Weekly Hours:</label>
                      <Field
                        name="WeeklyHours"
                        type="text"
                        component={renderField}
                        PlaceholderText="Weekly Hours"
                        validate={[numberValue]}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Daily Rate/Price:</label>
                      <Field
                        name="DailyRatePrice"
                        type="text"
                        component={renderField}
                        PlaceholderText="Daily Rate/Price"
                        validate={[numberValue]}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Daily Cost:</label>
                      <Field
                        name="DailyCost"
                        type="text"
                        component={renderField}
                        PlaceholderText="Daily Cost"
                        validate={[numberValue]}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Role Level:</label>

                      <Field
                        name="RoleLevel"
                        type="text"
                        component={renderSelectField}
                      >
                        <option value="">Please Select</option>
                        <option value="India Landed A">India Landed A</option>
                        <option value="India Landed B">India Landed B</option>
                        <option value="India Landed C">India Landed C</option>
                        <option value="India Landed D">India Landed D</option>
                        <option value="India Remote A">India Remote A</option>
                        <option value="India Remote B">India Remote B</option>
                        <option value="India Remote C">India Remote C</option>
                        <option value="India Remote D">India Remote D</option>
                        <option value="UK & Europe A">UK & Europe A</option>
                        <option value="UK & Europe B">UK & Europe B</option>
                        <option value="UK & Europe C">UK & Europe C</option>
                        <option value="UK & Europe D">UK & Europe D</option>
                        <option value="UK Test Analyst">UK Test Analyst</option>
                        <option value="UK DEA">UK DEA</option>
                        <option value="Offshore Test Analyst">
                          Offshore Test Analyst
                        </option>
                        <option value="UK Test Lead">UK Test Lead</option>
                        <option value="UK NFT">UK NFT</option>
                        <option value="Offshore Test Manager">
                          Offshore Test Manager
                        </option>
                        <option value="UK Test Manager">UK Test Manager</option>
                        <option value="Offshore Test Lead">
                          Offshore Test Lead
                        </option>
                        <option value="FIXED - Billable">
                          FIXED - Billable
                        </option>
                        <option value="Offshore NFT">Offshore NFT</option>
                        <option value="Offshore DEA">Offshore DEA</option>
                        <option value="UK Test Engineer">
                          UK Test Engineer
                        </option>
                        <option value="Offshore Test Engineer">
                          Offshore Test Engineer
                        </option>
                        <option value="FIXED - Non Billable">
                          FIXED - Non Billable
                        </option>
                        <option value="CTS UK Service Manager">
                          CTS UK Service Manager
                        </option>
                        <option value="UK Lead Test Engineer">
                          UK Lead Test Engineer
                        </option>
                        <option value="UK Junior Test Engineer">
                          UK Junior Test Engineer
                        </option>
                        <option value="CTS Offshore Service Manager">
                          CTS Offshore Service Manager
                        </option>
                        <option value="UK Programme Test Manager">
                          UK Programme Test Manager
                        </option>
                        <option value="Others">Others</option>
                        <option value="Non Billable">Non Billable</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>NBS Cost Centre:</label>
                      <Field
                        name="NBSCostCentre"
                        type="text"
                        component={renderField}
                        PlaceholderText="NBS Cost Centre"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Service Type:</label>
                      <Field
                        name="ServiceType"
                        type="text"
                        component={renderField}
                        PlaceholderText="Service Type"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Service Type - Breakdown:</label>
                      <Field
                        name="ServiceTypeBreakdown"
                        type="text"
                        component={renderField}
                        PlaceholderText="Service Type - Breakdown"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>NBS JRSS:</label>
                      <Field
                        name="NBSJRSS"
                        type="text"
                        component={renderField}
                        PlaceholderText="NBS JRSS"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Billing Role:</label>
                      <Field
                        name="BillingRole"
                        type="text"
                        component={renderField}
                        PlaceholderText="Billing Role"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label>Method of Work:</label>
                      <Field
                        name="MethodOfWork"
                        type="text"
                        component={renderField}
                        PlaceholderText="Method of Work"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="actions-button">
            <Button variant="secondary" onClick={this.clearForm}>
              Clear
            </Button>
            <Button
              variant="primary"
              disabled={submitting}
              type="submit"
              className="float-right"
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

EmployeeForm.propTypes = {
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  employee: makeSelectEmployee(),
  login_response: makeSelectLoginResponse(),
  loggedInUserName: makeSelectLoggedInUserName(),
});

export function mapDispatchToProps(dispatch, props) {
  return {
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    },
    postSubmit: function(value) {
      dispatch(addEmployee(value));
    },
  };
}

EmployeeForm = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false,
})(EmployeeForm);

const selector = formValueSelector(form);

EmployeeForm = connect(state => {
  const HCAMID = selector(state, 'HCAMID');
  const CID = selector(state, 'CID');
  const EmployeeName = selector(state, 'EmployeeName');
  const IBMEmailID = selector(state, 'IBMEmailID');
  const NationwideEmailID = selector(state, 'NationwideEmailID');
  const Gender = selector(state, 'Gender');
  const Status = selector(state, 'Status');
  const RoleAtIBM = selector(state, 'RoleAtIBM');
  const ContractService = selector(state, 'ContractService');
  const DGDC = selector(state, 'DGDC');
  const DGDCSquad = selector(state, 'DGDCSquad');
  const PortfolioLeadOffshore = selector(state, 'PortfolioLeadOffshore');
  const Country = selector(state, 'Country');
  const LOB = selector(state, 'LOB');
  const EmployeeType = selector(state, 'EmployeeType');
  const WorkLocation = selector(state, 'WorkLocation');
  const CurrentWorkLocation = selector(state, 'CurrentWorkLocation');
  const LocationStatus = selector(state, 'LocationStatus');
  const LandedHCAMorIA = selector(state, 'LandedHCAMorIA');
  const BandonJoiningNationwide = selector(state, 'BandonJoiningNationwide');
  const CurrentBand = selector(state, 'CurrentBand');
  const AccountOnboardDate = selector(state, 'AccountOnboardDate');
  const AccountOffboardingOffboardedDate = selector(
    state,
    'AccountOffboardingOffboardedDate',
  );
  const OffboardingReqRecdDate = selector(state, 'OffboardingReqRecdDate');
  const ReasonforLeaving = selector(state, 'ReasonforLeaving');
  const SourceofInformation = selector(state, 'SourceofInformation');
  const Remarks = selector(state, 'Remarks');

  const IBMID = selector(state, 'IBMID');
  const Billable = selector(state, 'Billable');
  const FTE = selector(state, 'FTE');
  const WeeklyHours = selector(state, 'WeeklyHours');
  const RoleLevel = selector(state, 'RoleLevel');
  const DailyRatePrice = selector(state, 'DailyRatePrice');
  const DailyCost = selector(state, 'DailyCost');
  const NBSCostCentre = selector(state, 'NBSCostCentre');
  const ServiceType = selector(state, 'ServiceType');
  const ServiceTypeBreakdown = selector(state, 'ServiceTypeBreakdown');
  const NBSJRSS = selector(state, 'NBSJRSS');
  const BillingRole = selector(state, 'BillingRole');
  const MethodOfWork = selector(state, 'MethodOfWork');

  return {
    HCAMID,
    CID,
    EmployeeName,
    IBMEmailID,
    NationwideEmailID,
    Gender,
    Status,
    RoleAtIBM,
    ContractService,
    DGDC,
    DGDCSquad,
    PortfolioLeadOffshore,
    Country,
    LOB,
    EmployeeType,
    WorkLocation,
    CurrentWorkLocation,
    LocationStatus,
    LandedHCAMorIA,
    BandonJoiningNationwide,
    CurrentBand,
    AccountOnboardDate,
    AccountOffboardingOffboardedDate,
    OffboardingReqRecdDate,
    ReasonforLeaving,
    SourceofInformation,
    Remarks,
    IBMID,
    Billable,
    FTE,
    WeeklyHours,
    RoleLevel,
    DailyRatePrice,
    DailyCost,
    NBSCostCentre,
    ServiceType,
    ServiceTypeBreakdown,
    NBSJRSS,
    BillingRole,
    MethodOfWork,
  };
})(EmployeeForm);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'employeeForm', saga });

export default compose(
  withSaga,
  withConnect,
)(EmployeeForm);
