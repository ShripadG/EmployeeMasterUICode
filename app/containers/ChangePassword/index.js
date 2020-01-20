/**
 *
 * ChangePassword
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { makeSelectChangePasswordUser } from './selectors';
import { makeSelectChangePasswordLogin } from './selectors';
import { makeSelectUser } from '../LoginMaster/selectors';
import { makeSelectLoggedInUserName, makeSelectLoginResponse } from '../LoginForm/selectors';
import { actionChangePassword } from './actions';
import saga from './saga';
import { push } from 'react-router-redux';
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError,
} from 'redux-form/immutable';

import '../../css/login.css';

const form = 'changePassword';

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

function validate(formProps) {
  const alldata = JSON.parse(JSON.stringify(formProps));

  const errors = {};

  if (!alldata.username) {
    errors.username = 'This field cannot be empty';
  }
  if (!alldata.Password) {
    errors.Password = 'This field cannot be empty';
  }
  if (!alldata.RePassword) {
    errors.RePassword = 'This field cannot be empty';
  } else if (alldata.RePassword != alldata.Password) {
    errors.RePassword = 'Password and RePassword are not same';
  }

  return errors;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.login_response,this.props.loggedInUserName,'this.props.userData')
    if (this.props.login_response && this.props.loggedInUserName) {
      //this.props.initialize(this.props.userData);
      this.props.changeFieldValue('username',this.props.loggedInUserName.username);
    } else {
      this.props.initialize({});
    }

    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
   }
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
          this.props.actionChangePassword(alldata);
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
                    <h3>Change Password</h3>
                  </div>
                  <div className="login-field-style">
                    <label>Username :</label>

                    <Field
                      name="username"
                      type="text"
                      component={renderField}
                      disabled={this.props.login_response.logintypes !== 'admin'}
                      PlaceholderText="Please enter username"
                    />
                  </div>
                  <div className="login-field-style">
                    <label>Password :</label>
                    <Field
                      name="Password"
                      type="password"
                      component={renderField}
                      PlaceholderText="Please enter password"
                    />
                  </div>

                  <div className="login-field-style">
                    <label>Re Enter Your Password :</label>
                    <Field
                      name="RePassword"
                      type="password"
                      component={renderField}
                      PlaceholderText="Please re-enter password"
                    />
                  </div>
                  <br />
                  <div className="submit-field-style">
                    <button
                      className="btn btn-primary"
                      disabled={submitting}
                      type="submit"
                    >
                      Submit
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

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUser(),
  changeuserpassword: makeSelectChangePasswordUser(),
  loggedInUserName: makeSelectLoggedInUserName(),
  login_response: makeSelectLoginResponse(),
  //changepasswordlogin: makeSelectChangePasswordLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    },
    actionChangePassword: function(alldata) {
      dispatch(actionChangePassword(alldata));
    },
  };
}

ChangePassword = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false,
})(ChangePassword);

const selector = formValueSelector(form);

ChangePassword = connect(state => {
  const username = selector(state, 'username');
  const Password = selector(state, 'Password');
  const RePassword = selector(state, 'RePassword');
  return {
    username,
    RePassword,
    Password,
  };
})(ChangePassword);

const withSaga = injectSaga({ key: form, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(ChangePassword);
