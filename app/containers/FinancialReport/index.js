/**
 *
 * FinancialReport
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { FinancialReport_API_URL } from '../../utils/constants';
import { makeSelectLoginResponse } from '../LoginForm/selectors';
import { makeSelectAllEmployee } from '../Dashboard/selectors';
import { push } from 'react-router-redux';
import Moment from 'moment';
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError,
  reset,
  SubmissionForm,
} from 'redux-form/immutable';
import { setDateFormat } from 'utils/commonMethods';
import '../../css/login.css';
import axios, { post } from 'axios';
import saga from './saga';
import Workbook from 'react-xlsx-workbook';

const form = 'financial-report';

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

class FinancialReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
      onboardedDataset:[],
      offboardedDataset:[]
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentDidMount() {
    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
    } else {
      const { allemployee } = this.props;


      if (allemployee && allemployee.rows && allemployee.rows.length > 0) {
        // Onboarding grid data
        const onboardedDataset = _.orderBy(
          _.flatMapDepth(
            _.filter(allemployee.rows, function(a) {
              return (
                (a.doc.Status == 'Onboarded' ||
                a.doc.Status == 'Offboarding')
              );
            }),
            'doc',
            2,
          ),
          function(a) {
            return Moment(a.AccountOnboardDate, 'DD-MM-YYYY HH:mm');
          },
          'desc',
        );
        
        // Offboarding grid data
        const offboardedDataset = 
          _.orderBy(
            _.flatMapDepth(
              _.filter(allemployee.rows, function(a) {
                return (
                  a.doc.AccountOffboardingOffboardedDate != null &&
                  a.doc.AccountOffboardingOffboardedDate != '' &&
                  a.doc.AccountOffboardingOffboardedDate != 'TBC' &&
                  a.doc.AccountOffboardingOffboardedDate != 'string' &&
                  a.doc.Status == 'Offboarded' &&
                  a.doc.IsDeleted == 'false'
                );
              }),
              'doc',
              2,
            ),
            function(a) {
              return Moment(
                a.AccountOffboardingOffboardedDate,
                'DD-MM-YYYY HH:mm',
              );
            },
            'desc',
        );

        this.setState({
          onboardedDataset,
          offboardedDataset
        })
      }
    }
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
  }

  render() {
    const now = Moment();

    const today = Moment(setDateFormat(now._d)).format('DD-MM-YYYY');

    const formattedDate = Moment(setDateFormat(now._d)).format('DD MMMM');

    const filename = today + ' DCDG Capacity Report.xlsx';
    const data1 = [
      {
        foo: '123',
        bar: '456',
        baz: '789',
      },
      {
        foo: 'abc',
        bar: 'dfg',
        baz: 'hij',
      },
      {
        foo: 'aaa',
        bar: 'bbb',
        baz: 'ccc',
      },
    ];

    const baseLineSheet = 'Baseline as we @ ' + formattedDate;

    const data2 = [
      {
        aaa: 1,
        bbb: 2,
        ccc: 3,
      },
      {
        aaa: 4,
        bbb: 5,
        ccc: 6,
      },
    ];

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
                    <h3>Capacity Report</h3>
                  </div>

                  {/* <div className="login-field-style">
                    <label style={{ marginRight: '10px' }}>
                      Select duration
                    </label>
                    <Field
                      name="duration"
                      type="text"
                      component={renderSelectField}
                      //onChange={this.onChangeListValue}
                    >
                      <option value="">Please Select</option>
                      <option value="1">Month</option>
                      <option value="3">Quarter</option>
                      <option value="6">Half year</option>
                      <option value="12">Year</option>
                    </Field>
                  </div> */}
                  <div className="login-field-style">
                    <label style={{ marginRight: '10px' }}>Contract</label>
                    <Field
                      name="contact"
                      type="text"
                      component={renderSelectField}
                      //onChange={this.onChangeListValue}
                    >
                      <option value="">Please Select</option>
                      {/* <option value="All">All</option> */}
                      <option value="DCDG">DCDG</option>
                      <option value="Test">Test</option>
                    </Field>
                  </div>
                  {/* <div className="login-field-style">
                    <label style={{ marginRight: '10px' }}>
                      Select Portfolio
                    </label>
                    <Field
                      name="portfolio"
                      type="text"
                      component={renderSelectField}
                      //onChange={this.onChangeListValue}
                    >
                      <option value="">Please Select</option>
                      <option value="all">all</option>
                    </Field>
                  </div> */}
                  <div className="login-field-style">
                    {this.state.loading && (
                      <h4 style={{ color: '#000' }}>
                        Please wait.......
                        <div className="spinner-border" role="status" />
                      </h4>
                    )}

                    <br />
                    <div className="submit-field-style">
                      <Workbook
                        filename={filename}
                        element={
                          <button className="btn btn-lg btn-primary">
                            Download
                          </button>
                        }
                      >
                        <Workbook.Sheet data={data1} name="Summary Sheet">
                          <Workbook.Column label="Foo" value="foo" />
                          <Workbook.Column label="Bar" value="bar" />
                        </Workbook.Sheet>
                        <Workbook.Sheet data={data2} name="Sheet5">

                          
                          <Workbook.Column
                            label="Double aaa"
                            value={row => row.aaa * 2}
                          />
                          <Workbook.Column
                            label="Cubed ccc "
                            value={row => Math.pow(row.ccc, 3)}
                          />
                        </Workbook.Sheet>
                        <Workbook.Sheet data={this.state.onboardedDataset} name={baseLineSheet}>
                          <Workbook.Column  label="Count Flag"value="AccountOnboardDate"/>
                          <Workbook.Column  label="Resource Name"value="EmployeeName"/>
                          <Workbook.Column  label="CID"value="CID"/>
                          <Workbook.Column  label="IBM Serial No"value="IBMID"/>
                          <Workbook.Column  label="Role"value="RoleAtIBM"/>
                          <Workbook.Column  label="Type"value="RoleAtIBM"/>
                          <Workbook.Column  label="Location"value="LocationStatus"/>
                          <Workbook.Column  label="Work Location"value="WorkLocation"/>
                          <Workbook.Column  label="Employee Type (Regular,SSP,CIC)"value="EmployeeType"/>
                          <Workbook.Column  label="NBS Cost Centre"value="NBSCostCentre"/>
                          <Workbook.Column  label="Rate Card Type"value="NBSCostCentre"/>
                          <Workbook.Column  label="Service Type- Breakdown"value="NBSCostCentre"/>
                          <Workbook.Column  label="Remarks"value="NBSCostCentre"/>
                          <Workbook.Column  label="Allignment as per Squad(IBM PO)" value="NBSCostCentre"/>
                          <Workbook.Column  label="Allignment as per Squad(NBS)" value="NBSCostCentre"/>
                          <Workbook.Column  label="Onshore Lead" value="NBSCostCentre"/>
                          <Workbook.Column  label="Offshore Lead" value="PortfolioLeadOffshore"/>
                          <Workbook.Column  label="DOJ NBS" value="AccountOnboardDate"/>
                          <Workbook.Column  label="Gender" value="PortfolioLeadOffshore"/>
                          <Workbook.Column  label="DC Name(NBS)" value="NBSCostCentre"/>
                          <Workbook.Column  label="GD Landed Resource UK SR No" value="NBSCostCentre"/>
                        </Workbook.Sheet>
                        <Workbook.Sheet data={this.state.onboardedDataset} name="On board">
                          <Workbook.Column  label="NBS DOJ"value="AccountOnboardDate"/>
                          <Workbook.Column  label="Resource Name"value="EmployeeName"/>
                          <Workbook.Column  label="CID"value="CID"/>
                          <Workbook.Column  label="IBM Serial No"value="IBMID"/>
                          <Workbook.Column  label="Role"value="RoleAtIBM"/>
                          <Workbook.Column  label="Type"value="RoleAtIBM"/>
                          <Workbook.Column  label="Location"value="LocationStatus"/>
                          <Workbook.Column  label="Work Location"value="WorkLocation"/>
                          <Workbook.Column  label="Employee Type"value="EmployeeType"/>
                          <Workbook.Column  label="NBS Cost Centre"value="NBSCostCentre"/>
                          <Workbook.Column  label="Rate Card Type"value="NBSCostCentre"/>
                          <Workbook.Column  label="Service Type- Breakdown"value="NBSCostCentre"/>
                          <Workbook.Column  label="Allignment as per Squad" value="NBSCostCentre"/>
                          <Workbook.Column  label="Onshore Lead" value="NBSCostCentre"/>
                          <Workbook.Column  label="Offshore Lead" value="PortfolioLeadOffshore"/>
                          <Workbook.Column  label="DC/Project Name" value="NBSCostCentre"/>
                        </Workbook.Sheet>

                        <Workbook.Sheet data={this.state.offboardedDataset} name="Offboarded">
                          <Workbook.Column  label="Offboarding Date"value="AccountOffboardingOffboardedDate"/>
                          <Workbook.Column  label="Resource Name"value="EmployeeName"/>
                          <Workbook.Column  label="CID"value="CID"/>
                          <Workbook.Column  label="IBM Serial No"value="IBMID"/>
                          <Workbook.Column  label="Role"value="RoleAtIBM"/>
                          <Workbook.Column  label="Type"value="RoleAtIBM"/>
                          <Workbook.Column  label="Location"value="LocationStatus"/>
                          <Workbook.Column  label="Work Location"value="WorkLocation"/>
                          <Workbook.Column  label="Employee Type"value="EmployeeType"/>
                          <Workbook.Column  label="NBS Cost Centre"value="NBSCostCentre"/>
                          <Workbook.Column  label="Rate Card Type"value="NBSCostCentre"/>
                          <Workbook.Column  label="Service Type- Breakdown"value="NBSCostCentre"/>
                          <Workbook.Column  label="Allignment as per Squad" value="NBSCostCentre"/>
                          <Workbook.Column  label="Onshore Lead" value="NBSCostCentre"/>
                          <Workbook.Column  label="Offshore Lead" value="PortfolioLeadOffshore"/>
                          <Workbook.Column  label="DC/Project Name" value="NBSCostCentre"/>
                        </Workbook.Sheet>
                      </Workbook>
                    </div>
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

FinancialReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allemployee: makeSelectAllEmployee(),
  login_response: makeSelectLoginResponse(),
  //allemployee: makeSelectAllEmployee(),
  //user_right: makeSelectUserRightResponse()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    //getAllEmployee: () => {
    //  dispatch(getAllEmployee());
    //},
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    },
  };
}

FinancialReport = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false,
})(FinancialReport);

const selector = formValueSelector(form);

FinancialReport = connect(state => {
  const FileXls = selector(state, 'FileXls');
  return {
    FileXls,
  };
})(FinancialReport);

const withSaga = injectSaga({ key: form, saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(FinancialReport);
