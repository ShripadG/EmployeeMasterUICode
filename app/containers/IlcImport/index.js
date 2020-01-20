/**
 *
 * IlcImport
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { ILC_API_URL } from '../../utils/constants';

import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError,
  reset,
  SubmissionForm,
} from 'redux-form/immutable';
import { makeSelectLoginResponse } from '../LoginForm/selectors';
import { push } from 'react-router-redux';

import '../../css/login.css';
import axios, { post } from 'axios';
import saga from './saga';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);


const form = 'ilcImport';

class IlcImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loadingCSV: false,
      displayError: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit

    if (this.state.file) {
      this.setState({
        displayError: false,
        loadingCSV: true,
      });
      this.fileUpload(this.state.file).then(response => {
        this.setState({
          loadingCSV: false,
        });
      });
    } else {
      this.setState({
        displayError: 'Please upload xls file',
        loadingCSV: false,
      });
    }
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  fileUpload(file) {
    const url = ILC_API_URL + '/FILE';
    const formData = new FormData();
    formData.append('File', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  }
  componentDidMount() {
    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
   }
  }
  render() {
    const { submitting } = this.props;
    return (
      <div className="login-style background-image">
        <div className="container">
          <div className="row text-white">
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
              <div className="px-2">
                <form
                  className="login-form justify-content-center"
                  autoComplete="off"
                  onSubmit={this.onFormSubmit}
                >
                  <div>
                    <h3>Import ILC</h3>
                  </div>

                  <div className="login-field-style">
                    <label style={{ marginRight: '10px' }}>
                      Import ILC here :
                    </label>
                 
                    <input
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      type="file"
                      onChange={this.onChange}
                    />
                    {this.state.displayError && (
                      <div className="error">{this.state.displayError}</div>
                    )}
                  </div>
                  {this.state.loadingCSV && (
                    <h4 style={{ color: '#000' }}>
                      Please wait.......
                      <div className="spinner-border" role="status" />
                    </h4>
                  )}

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

IlcImport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // IlcImport: makeSelectIlcImport(),
  login_response: makeSelectLoginResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    },
  };
}

IlcImport = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false,
})(IlcImport);

const selector = formValueSelector(form);

IlcImport = connect(state => {
  const FileXls = selector(state, 'FileXls');
  return {
    FileXls,
  };
})(IlcImport);

const withSaga = injectSaga({ key: form, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(IlcImport);
