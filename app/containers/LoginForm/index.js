/**
 *
 * LoginForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';

import { makeSelectLoginForm, makeSelectLoginError } from './selectors';
import { actionLogin } from './actions';
import saga from './saga';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError,
  reset,
  SubmissionForm,
} from 'redux-form/immutable';
import LoadingBar from 'react-top-loading-bar';

import '../../css/login.css';
import '../../css/employee.css';

const form = 'loginForm';

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

function validate(formProps) {
  const alldata = JSON.parse(JSON.stringify(formProps));

  const errors = {};

  if (!alldata.username) {
    errors.username = 'This field cannot be empty';
  }
  if (!alldata.password) {
    errors.password = 'This field cannot be empty';
  }
  return errors;
}
class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    // setTimeout(
    //   function() {
        if (
          prevProps.loginError !== this.props.loginError &&
          this.props.loginError
        ) {
          toast.error('Invalid login or password', {
            position: toast.POSITION.TOP_RIGHT,
          });
          this.LoadingBar.complete();
        }
    //   }.bind(this),
    //   400,
    // );
  }

  onSubmitForm(values) {
    return sleep(10)
      .then(() => validate(values, this.props))
      .then(errors => {
        const countErr = Object.keys(errors).length;
        if (countErr > 0) {
          throw new SubmissionError(errors);
        } else {
          //final submit
          this.LoadingBar.continuousStart();
          let alldata = JSON.parse(JSON.stringify(values));
          this.props.actionLogin(alldata);
        }
      });
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="login-style background-image">
        <ToastContainer />
        <LoadingBar
          height={5}
          color='#36A2EB'
          onRef={ref => (this.LoadingBar = ref)}
        />
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
                    <h3>Login details</h3>
                  </div>
                  <div className="login-field-style">
                    <label>Username :</label>

                    <Field
                      name="username"
                      type="text"
                      component={renderField}
                      PlaceholderText="Please enter your username"
                    />
                  </div>
                  <div className="login-field-style">
                    <label>Password</label>

                    <Field
                      name="password"
                      type="password"
                      component={renderField}
                      PlaceholderText="Please enter your password"
                    />
                  </div>
                  <br />
                  <div className="submit-field-style">
                    <button
                      className="btn btn-primary"
                      disabled={submitting}
                      type="submit"
                    >
                      Login
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

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginError: makeSelectLoginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    },
    actionLogin: function(value) {
      dispatch(actionLogin(value));
    },
  };
}

LoginForm = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false,
})(LoginForm);

const selector = formValueSelector(form);

LoginForm = connect(state => {
  const username = selector(state, 'username');
  const password = selector(state, 'password');
  return {
    username,
    password,
  };
})(LoginForm);

const withSaga = injectSaga({ key: form, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(LoginForm);
