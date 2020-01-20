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
import { push } from 'react-router-redux';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import saga from './saga';

import {
  addILC
} from './actions';

import{
  makeSelectOneILC
} from './selectors';

import 'react-widgets/dist/css/react-widgets.css';

import { setDateFormat, setDateFormatApi } from 'utils/commonMethods';

Moment.locale('en');
momentLocalizer();

const form = 'ILCForm';

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

const renderDateTimePicker = function(params) {
  const dateInput = setDateFormat(params.input.value);

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

const radioButtonErrorGenerator = ({
  input,
  meta: { touched, error, warning },
}) => <div>{touched && error && <span className="error">{error}</span>}</div>;

function validate(formProps, props) {
  const alldata = JSON.parse(JSON.stringify(formProps));
  const errors = {};

  if (!alldata.satHoursExpended) {
    errors.satHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.satHoursExpended)<0 || Number(alldata.satHoursExpended)>24){
    errors.satHoursExpended = 'Kindly correct the hrs';
  }

  if (!alldata.sunHoursExpended) {
    errors.sunHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.sunHoursExpended)<0 || Number(alldata.sunHoursExpended)>24){
    errors.sunHoursExpended = 'Kindly correct the hrs';
  }

  if (!alldata.monHoursExpended) {
    errors.monHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.monHoursExpended)<0 || Number(alldata.monHoursExpended)>24){
    errors.monHoursExpended = 'Kindly correct the hrs';
  }

  if (!alldata.tueHoursExpended) {
    errors.tueHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.tueHoursExpended)<0 || Number(alldata.tueHoursExpended)>24){
    errors.tueHoursExpended = 'Kindly correct the hrs';
  }

  if (!alldata.wedHoursExpended) {
    errors.wedHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.wedHoursExpended)<0 || Number(alldata.wedHoursExpended)>24){
    errors.wedHoursExpended = 'Kindly correct the hrs';
  }

  if (!alldata.thuHoursExpended) {
    errors.thuHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.thuHoursExpended)<0 || Number(alldata.thuHoursExpended)>24){
    errors.thuHoursExpended = 'Kindly correct the hrs';
  }

  if (!alldata.friHoursExpended) {
    errors.friHoursExpended = 'This field cannot be empty';
  }else if(Number(alldata.friHoursExpended)<0 || Number(alldata.friHoursExpended)>24){
    errors.friHoursExpended = 'Kindly correct the hrs';
  }

  return errors;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class ILCForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onClearForm = this.onClearForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.login_response) {
    //  this.props.dispatch(push('/'));
    }
    if (this.props.selected_row) {
      this.props.initialize(this.props.selected_row);
    } else {
      this.props.initialize({});
    }
  }

  onClearForm(){
    this.props.changeFieldValue('satHoursExpended','');
    this.props.changeFieldValue('sunHoursExpended','');
    this.props.changeFieldValue('monHoursExpended','');
    this.props.changeFieldValue('tueHoursExpended','');
    this.props.changeFieldValue('wedHoursExpended','');
    this.props.changeFieldValue('thuHoursExpended','');
    this.props.changeFieldValue('friHoursExpended','');
  }

  onSubmitForm(values) {
    return sleep(10)
      .then(() => validate(values, this.props))
      .then(errors => {
        const countErr = Object.keys(errors).length;
        if (countErr > 0) {
          throw new SubmissionError(errors);
        } else {
          // final submit
          const alldata = JSON.parse(JSON.stringify(values));
          alldata.weekEndingDate = setDateFormatApi(
            alldata.weekEndingDate,
          );
          alldata.RowAddedDate = `${Moment(new Date())}`;
          this.props.postSubmit(alldata);
        }
      });
  }

  render() {
    const { handleSubmit, submitting, selected_row } = this.props;
    const { saving } = this.state;

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
            onClick={() => this.props.dispatch(push('/ilc-master'))}
          >
            Go To ILC Listing
          </Button>
        </div>
         <form
          onSubmit={handleSubmit(this.onSubmitForm)}
          autoComplete="off"
          className="form-inline"
        >
          <Tabs defaultActiveKey="ILCdetails" id="ilcdetails">
            <Tab eventKey="ILCdetails" title="ILC details">
              <div className="p-4" id="result">
                <div className="row">
                  <div className="col-sm-1 col-md-1 col-lg-2">
                    <div className="form-group">
                      <label>W/E Date:</label>
                      <Field
                        name="weekEndingDate"
                        disabled
                        component={renderDateTimePicker}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Employee #:</label>
                      <Field
                        name="empSerNum"
                        disabled
                        component={renderField}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-2">
                    <div className="form-group">
                      <label>Employee Name:</label>
                      <Field
                        name="empName"
                        disabled
                        component={renderField}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Account ID:</label>
                      <Field
                        name="accountId"
                        disabled
                        type="text"
                        component={renderField}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Activity CD:</label>
                      <Field
                        name="activityCd"
                        disabled
                        type="text"
                        component={renderField}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Sat:</label>
                      <Field
                        name="satHoursExpended"
                        type="number"
                        component={renderField}
                      >
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Sun:</label>
                      <Field
                        name="sunHoursExpended"
                        type="number"
                        component={renderField}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Mon:</label>
                      <Field
                        name="monHoursExpended"
                        type="number"
                        component={renderField}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Tue:</label>
                      <Field
                        name="tueHoursExpended"
                        type="number"
                        component={renderField}
                      >
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Wed:</label>
                      <Field
                        name="wedHoursExpended"
                        type="number"
                        component={renderField}
                      >
                      </Field>
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Thu:</label>
                      <Field
                        name="thuHoursExpended"
                        type="number"
                        component={renderField}
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1">
                    <div className="form-group">
                      <label>Fri:</label>
                      <Field
                        name="friHoursExpended"
                        type="number"
                        component={renderField}
                      >
                      </Field>
                    </div>
                  </div>
                  </div>
                </div>
            </Tab>
          </Tabs>

          <div className="actions-button">
            <Button variant="secondary" onClick={this.onClearForm}>
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

ILCForm.propTypes = {
  onSubmitForm: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  selected_row: makeSelectOneILC(),
});

export function mapDispatchToProps(dispatch, props) {
  return {
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    },
    postSubmit(value) {
      dispatch(addILC(value));
    },
  };
}

ILCForm = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false,
})(ILCForm);

const selector = formValueSelector(form);

ILCForm = connect(state => {
  const empSerNum = selector(state, 'empSerNum');
  const empName = selector(state, 'empName');
  const empLastName = selector(state, 'empLastName');
  const weekEndingDate = selector(state, 'weekEndingDate');
  const accountId = selector(state, 'accountId');
  const activityCd = selector(state, 'activityCd');
  const totalHoursExpended = selector(state, 'totalHoursExpended');
  const satHoursExpended = selector(state, 'satHoursExpended');
  const sunHoursExpended = selector(state, 'sunHoursExpended');
  const monHoursExpended = selector(state, 'monHoursExpended');
  const tueHoursExpended = selector(state, 'tueHoursExpended');
  const wedHoursExpended = selector(state, 'wedHoursExpended');
  const thuHoursExpended = selector(state, 'thuHoursExpended');
  const friHoursExpended = selector(state, 'friHoursExpended');

  return {
    empSerNum,
    empName,
    empLastName,
    weekEndingDate,
    accountId,
    activityCd,
    totalHoursExpended,
    satHoursExpended,
    sunHoursExpended,
    monHoursExpended,
    tueHoursExpended,
    wedHoursExpended,
    thuHoursExpended,
    friHoursExpended
  };
})(ILCForm);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'ILCForm', saga });

export default compose(
  withSaga,
  withConnect,
)(ILCForm);
