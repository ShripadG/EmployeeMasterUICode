/**
 *
 * RegistrationForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';

import makeSelectRegistrationForm from './selectors';
import { makeSelectUser } from '../LoginMaster/selectors';
import { makeSelectRegistrationUser } from './selectors';
import { actionRegistration } from './actions';
import { makeSelectUserRightResponse } from '../LoginForm/selectors';
import saga from './saga';
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError,
  reset,
  SubmissionForm,
} from 'redux-form/immutable';
import { push } from 'react-router-redux';

import '../../css/login.css';

const form = 'registrationForm';

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error },
  children,
  onChange,
}) => (
  <div>
    <select {...input} className="custom-dropdown form-control" type={type}>
      {children}
    </select>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

function validate(formProps, props) {
  //console.log(props,'props')
  const alldata = JSON.parse(JSON.stringify(formProps));

  const errors = {};

  if (!alldata.Username) {
    errors.Username = 'This field cannot be empty';
  }
  if (!props.userData && !alldata.Password) {
    errors.Password = 'This field cannot be empty';
  }
  if (!alldata.EmailID) {
    errors.EmailID = 'This field cannot be empty';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(alldata.EmailID)
  ) {
    errors.EmailID = 'Invalid email address';
  }
  if (!alldata.Type) {
    errors.Type = 'This field cannot be empty';
  }
  return errors;
}
class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isILCMaster: false,
      isLoginMaster: false,
      isEmployeeMaster: false,
      isForcastMaster: false,
      isFinancials: false,
      isReports: false,
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeListValue = this.onChangeListValue.bind(this);
    this.resetRoleType = this.resetRoleType.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.userRight);
    if (this.props.userData) {
      // console.log(this.props.userData, 'this.props.userData');
      this.props.initialize(this.props.userData);
      this.resetRoleType(this.props.userData.Type);
    } else {
      this.props.initialize({});
    }

  }

  resetRoleType(value) {
    if (this.props.userRight) {
      for (var i = 0; i < this.props.userRight.rows.length; i++) {
        if (this.props.userRight.rows[i].doc.logintypes === value) {
          this.setState({
            isILCMaster:
              this.props.userRight.rows[i].doc.ILCMaster === 'Y' ? true : false,
          });
          this.setState({
            isLoginMaster:
              this.props.userRight.rows[i].doc.LoginMaster === 'Y'
                ? true
                : false,
          });
          this.setState({
            isEmployeeMaster:
              this.props.userRight.rows[i].doc.IsEmployeeMaster === 'Y'
                ? true
                : false,
          });
          this.setState({
            isForcastMaster:
              this.props.userRight.rows[i].doc.ForcastMaster === 'Y'
                ? true
                : false,
          });
          this.setState({
            isFinancials:
              this.props.userRight.rows[i].doc.Financials === 'Y'
                ? true
                : false,
          });
          this.setState({
            isReports:
              this.props.userRight.rows[i].doc.Reports === 'Y' ? true : false,
          });
        }
      }
    }
  }

  onChangeListValue(e, value) {
    this.resetRoleType(value);
  }

  onSubmitForm(values) {
    //console.log(values,'values')
    return sleep(10)
      .then(() => validate(values, this.props))
      .then(errors => {
        const countErr = Object.keys(errors).length;
        if (countErr > 0) {
          throw new SubmissionError(errors);
        } else {
          //final submit
          let alldata = JSON.parse(JSON.stringify(values));
          this.props.actionRegistration(alldata);
        }
      });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="login-style background-image">
        <div className="container">
          <div className="row text-white">
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
              <div className="px-2">
                <form
                  className="login-form justify-content-center"
                  autoComplete="off"
                  onSubmit={handleSubmit(this.onSubmitForm)}
                >
                  <div>
                    <h3>Registration details</h3>
                  </div>

                  <div className="login-field-style">
                    <label>Email ID :</label>
                    <Field
                      name="EmailID"
                      type="text"
                      component={renderField}
                      PlaceholderText="Please enter your email"
                    />
                  </div>

                  <div
                    className={`login-field-style ${
                      this.props.userData ? 'disabled' : ''
                    }`}
                  >
                    <label>Username :</label>
                    <Field
                      name="Username"
                      type="text"
                      component={renderField}
                      disabled={this.props.userData}
                      PlaceholderText="Please enter your Username"
                    />
                  </div>
                  {!this.props.userData && (
                    <div className="login-field-style">
                      <label>Password</label>
                      <Field
                        name="Password"
                        type="password"
                        component={renderField}
                        PlaceholderText="Please enter your password"
                      />
                    </div>
                  )}
                  <div className="login-field-style">
                    <label>Role Type:</label>
                    <Field
                      name="Type"
                      type="text"
                      component={renderSelectField}
                      onChange={this.onChangeListValue}
                    >
                      <option value="">Please Select</option>
                      <option value="normal">Normal</option>
                      <option value="super">Super</option>
                      <option value="admin">Admin</option>
                    </Field>
                  </div>
                  <div className="thin-divide-line">
                    <div className="checkbox-group-inline">
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          disabled
                          checked={this.state.isEmployeeMaster}
                        />
                        <label>Employee Master</label>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          disabled
                          checked={this.state.isILCMaster}
                        />
                        <label>ILC Master</label>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          disabled
                          checked={this.state.isForcastMaster}
                        />
                        <label>Forcast Master</label>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          disabled
                          checked={this.state.isFinancials}
                        />
                        <label>Financials</label>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          disabled
                          checked={this.state.isReports}
                        />
                        <label>Reports</label>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          disabled
                          checked={this.state.isLoginMaster}
                        />
                        <label>LoginMaster</label>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="submit-field-style">
                    <button
                      className="btn btn-primary"
                      disabled={submitting}
                      type="submit"
                    >
                      {this.props.userData ? 'Update' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  registrationForm: makeSelectRegistrationForm(),
  userData: makeSelectUser(),
  registeredUserForm: makeSelectRegistrationUser(),
  userRight: makeSelectUserRightResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    actionRegistration: function(alldata) {
      dispatch(actionRegistration(alldata));
    },
  };
}

RegistrationForm = reduxForm({
  form,
  // touchOnBlur: false,
  // touchOnChange: false,
})(RegistrationForm);

const selector = formValueSelector(form);

RegistrationForm = connect(state => {
  const Username = selector(state, 'Username');
  const Password = selector(state, 'Password');
  const EmailID = selector(state, 'EmailID');
  const Type = selector(state, 'Type');
  return {
    Username,
    Password,
    Type,
    EmailID,
  };
})(RegistrationForm);

const withSaga = injectSaga({ key: form, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(RegistrationForm);
