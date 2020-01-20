/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import { push } from 'react-router-redux';
import { Doughnut, Bar } from 'react-chartjs-2';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import { makeSelectAllEmployee } from './selectors';
import {
  makeSelectLoginResponse,
  makeSelectUserRightResponse,
} from '../LoginForm/selectors';
import saga from './saga';
import 'chartjs-plugin-datalabels';
import LoadingBar from 'react-top-loading-bar';

import { getAllEmployee } from './actions';

import { setDateFormat, setDateFormatApi } from 'utils/commonMethods';
import { EMPLOYEE_API_URL } from '../../utils/constants';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCSV: false,
      onshore: [],
      offshore: [],
      totalEmployee: 0,
      Band5: {},
      Band6: {},
      Band7: {},
      Band8: {},
      Band9: {},
      totalEmp: {},
      onshoreGenderDonut: {},
      offshoreGenderDonut: {},
      billableHCdata: {},
      totalOptions: {},
      onShoreOptions: {},
      billableOptions: {},
      offShoreOptions: {},
      monthlyDataBar: {},
      bandWiseBarData: {},
      offboardingVsonboardingData: {},
      empArrtable: [],
      empArrtableSecond: [],
      login_resp: [],
    };
    this.EmpReport = this.EmpReport.bind(this);
  }

  onClickEmployee = () => this.props.dispatch(push('/employee'));

  onClickLoginMaster = () => this.props.dispatch(push('/login-master'));

  componentWillMount() {
    const alldata = JSON.parse(JSON.stringify(this.props.login_response));
    if (alldata) {
      this.setState({
        login_resp: alldata,
      });
    }
    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
    }
  }

  formatData() {
    const now = Moment();
    const pastYearRange = now.add(-1, 'y');
    const pastYear = pastYearRange.add(1, 'M').startOf('month');

    const { allemployee } = this.props;
    const empArrtable = [];
    const empArrtableSecond = [];

    if (allemployee && allemployee.rows && allemployee.rows.length > 0) {
      // Onboarding grid data
      const onboardedDataset = _.take(
        _.orderBy(
          _.flatMapDepth(
            _.filter(allemployee.rows, function(a) {
              return (
                a.doc.AccountOnboardDate != null &&
                a.doc.AccountOnboardDate != '' &&
                a.doc.AccountOnboardDate != 'TBC' &&
                a.doc.AccountOnboardDate != 'string' &&
                a.doc.Status != 'Offboarded' &&
                a.doc.IsDeleted == 'false'
              );
            }),
            'doc',
            2,
          ),
          function(a) {
            return Moment(a.AccountOnboardDate, 'DD-MM-YYYY HH:mm');
          },
          'desc',
        ),
        5,
      );

      onboardedDataset.forEach(function(value) {
        empArrtable.push({
          ContractService: value.ContractService,
          EmployeeName: value.EmployeeName,
          AccountOnboardDate:
            value.AccountOnboardDate &&
            Moment(setDateFormat(value.AccountOnboardDate))._isValid
              ? Moment(setDateFormat(value.AccountOnboardDate)).format(
                  'DD-MM-YYYY',
                )
              : '',
          Location: value.CurrentWorkLocation,
        });
      });

      // Offboarding grid data
      const offboardedDataset = _.take(
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
        ),
        5,
      );

      offboardedDataset.forEach(function(value) {
        empArrtableSecond.push({
          ContractService: value.ContractService,
          EmployeeName: value.EmployeeName,
          OffboardDate:
            value.AccountOffboardingOffboardedDate &&
            Moment(setDateFormat(value.AccountOffboardingOffboardedDate))
              ._isValid
              ? Moment(
                  setDateFormat(value.AccountOffboardingOffboardedDate),
                ).format('DD-MM-YYYY')
              : '',
          Location: value.CurrentWorkLocation,
        });
      });

      // Total Employee Offshore/OnShore
      const offshore = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.LocationStatus === 'Offshore' &&
              item.doc.IsDeleted == 'false' &&
              (item.doc.Status === 'Onboarded' ||
                item.doc.Status === 'Offboarding'),
          ).length
        : 0;

      const onshore = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.LocationStatus === 'Onshore' &&
              item.doc.IsDeleted == 'false' &&
              (item.doc.Status === 'Onboarded' ||
                item.doc.Status === 'Offboarding'),
          ).length
        : 0;

      const totalEmployee = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.IsDeleted == 'false' &&
              (item.doc.Status === 'Onboarded' ||
                item.doc.Status === 'Offboarding'),
          ).length
        : 0;

      const offshoreMale = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.IsDeleted == 'false' &&
              item.doc.Status == 'Onboarded' &&
              item.doc.LocationStatus == 'Offshore' &&
              item.doc.Gender == 'Male',
          ).length
        : 0;

      const offshoreFemale = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.IsDeleted == 'false' &&
              item.doc.Status == 'Onboarded' &&
              item.doc.LocationStatus == 'Offshore' &&
              item.doc.Gender == 'Female',
          ).length
        : 0;

      const onshoreMale = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.IsDeleted == 'false' &&
              item.doc.Status == 'Onboarded' &&
              item.doc.LocationStatus == 'Onshore' &&
              item.doc.Gender == 'Male',
          ).length
        : 0;

      const onshoreFemale = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.IsDeleted == 'false' &&
              item.doc.Status == 'Onboarded' &&
              item.doc.LocationStatus == 'Onshore' &&
              item.doc.Gender == 'Female',
          ).length
        : 0;

      const billable = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.IsDeleted == 'false' &&
              (item.doc.Status == 'Onboarded' ||
                item.doc.Status == 'Offboarding') &&
              item.doc.Billable == 'Y',
          ).length
        : 0;

      const notbillable = totalEmployee - billable;

      const bandWiseData = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.CurrentBand !== null &&
              item.doc.CurrentBand !== undefined &&
              item.doc.Status == 'Onboarded' &&
              !item.doc.AccountOffboardingOffboardedDate,
          )
        : [];

      const Band5 = _.countBy(bandWiseData, item =>
        _.startsWith(item.doc.CurrentBand, '5'),
      );
      const Band6 = _.countBy(bandWiseData, item =>
        _.startsWith(item.doc.CurrentBand, '6'),
      );
      const Band7 = _.countBy(bandWiseData, item =>
        _.startsWith(item.doc.CurrentBand, '7'),
      );
      const Band8 = _.countBy(bandWiseData, item =>
        _.startsWith(item.doc.CurrentBand, '8'),
      );
      const Band9 = _.countBy(bandWiseData, item =>
        _.startsWith(item.doc.CurrentBand, '9'),
      );

      // Onboarding
      const onboardMonthWise = item =>
        Moment(setDateFormat(item.doc.AccountOnboardDate)).format('MMM');

      const pastYrOnboardData = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.AccountOnboardDate != null &&
              item.doc.AccountOnboardDate != '' &&
              item.doc.AccountOnboardDate != 'TBC' &&
              item.doc.AccountOnboardDate != 'string' &&
              Moment(setDateFormat(item.doc.AccountOnboardDate)) >
                pastYear._d &&
              item.doc.IsDeleted === 'false' &&
              (item.doc.Status === 'Onboarded' ||
                item.doc.Status === 'Offboarding'),
          )
        : [];

      const pastYrOnboardOrderedData = _.orderBy(pastYrOnboardData, [
        'doc.AccountOnboardDate',
        'desc',
      ]);

      const pastYrOnboardOrderedDataSet = _.orderBy(
        pastYrOnboardOrderedData,
        item =>
          Moment(setDateFormat(item.doc.AccountOnboardDate)).format('YY-MM'),
        ['desc'],
      );

      const onboardingList = this.props.allemployee
        ? _.mapValues(
            _.groupBy(pastYrOnboardOrderedDataSet, onboardMonthWise),
            x => x.length,
          )
        : [];

      // Offboarding
      const offboardMonthWise = item =>
        Moment(setDateFormat(item.doc.AccountOffboardingOffboardedDate)).format(
          'MMM',
        );

      const pastYrOffboardData = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.AccountOffboardingOffboardedDate != null &&
              item.doc.AccountOffboardingOffboardedDate != '' &&
              item.doc.AccountOffboardingOffboardedDate != 'TBC' &&
              item.doc.AccountOffboardingOffboardedDate != 'string' &&
              Moment(
                setDateFormat(item.doc.AccountOffboardingOffboardedDate),
              ) >= pastYear._d &&
              item.doc.IsDeleted === 'false' &&
              item.doc.Status === 'Offboarded',
          )
        : [];

      const pastYrOffboardOrderedData = _.orderBy(
        pastYrOffboardData,
        item =>
          Moment(
            setDateFormat(item.doc.AccountOffboardingOffboardedDate),
          ).format('YY-MM'),
        ['desc'],
      );
      const offboardingList = this.props.allemployee
        ? _.mapValues(
            _.groupBy(pastYrOffboardOrderedData, offboardMonthWise),
            x => x.length * -1,
          )
        : [];

      // Monthly Billable
      const billableMonthWise = item =>
        Moment(setDateFormat(item.doc.AccountOnboardDate)).format('MMM');

      const prevYrBillable = item =>
        item.doc.AccountOnboardDate &&
        Moment(setDateFormat(item.doc.AccountOnboardDate))._isValid &&
        Moment(setDateFormat(item.doc.AccountOnboardDate)) <= pastYear._d &&
        (!item.doc.AccountOffboardingOffboardedDate ||
          Moment(setDateFormat(item.doc.AccountOffboardingOffboardedDate)) >=
            pastYear._d);

      const totalbillableData = this.props.allemployee
        ? this.props.allemployee.rows.filter(
            item =>
              item.doc.AccountOnboardDate &&
              Moment(setDateFormat(item.doc.AccountOnboardDate)) >=
                pastYear._d &&
              item.doc.IsDeleted === 'false' &&
              item.doc.Status === 'Onboarded',
          )
        : [];

      const pastYrBillableOrderedData = _.orderBy(
        totalbillableData,
        item =>
          Moment(setDateFormat(item.doc.AccountOnboardDate)).format('YY-MM'),
        ['desc'],
      );

      const array = [];
      // Added to implement fibbonacci series
      array.push(totalEmployee); // Added total implement

      const billableList = this.props.allemployee
        ? _.mapValues(
            _.groupBy(pastYrBillableOrderedData, billableMonthWise),
            function(value, key) {
              // Offbaording chart array was converted to -ve
              // Converted offbarding chart array to +ve and if balnk set to 0
              // value referers to onbaording per month
              // Total employee + Offboarding - Onboarding
              array.push(
                (offboardingList[key] ? offboardingList[key] * -1 : 0) -
                  onboardingList[key],
              );
              return _.sum(array);
            },
          )
        : [];

      const totalEmp = {
        labels: [
          'Offshore ' +
            `${Math.round((offshore / (offshore + onshore)) * 100)}%`,
          'Onshore ' + `${Math.round((onshore / (offshore + onshore)) * 100)}%`,
        ],
        datasets: [
          {
            data: [offshore, onshore],
            backgroundColor: ['#2874A6', '#36A2EB'],
          },
        ],
      };

      const onshoreGenderDonut = {
        labels: ['Female', 'Male'],
        datasets: [
          {
            data: [onshoreFemale, onshoreMale],
            backgroundColor: ['#36A2EB'],
            hoverBackgroundColor: ['#36A2EB'],
          },
        ],
      };

      const offshoreGenderDonut = {
        labels: ['Female', 'Male'],
        datasets: [
          {
            data: [offshoreFemale, offshoreMale],
            backgroundColor: ['#36A2EB'],
            hoverBackgroundColor: ['#36A2EB'],
          },
        ],
      };

      const billableHCdata = {
        labels: [`${Math.round((billable / (billable + notbillable)) * 100)}%`],
        datasets: [
          {
            data: [billable, notbillable],
            backgroundColor: ['#36A2EB'],
            hoverBackgroundColor: ['#36A2EB'],
          },
        ],
      };

      const onShoreOptions = {
        responsive: true,
        fullWidth: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 10,
            right: 0,
            top: 10,
            bottom: 0,
          },
        },
        title: {
          display: true,
          position: 'bottom',
          fontSize: 16,
          text:
            'Onshore(' +
            `${Math.round(
              (onshoreFemale / (onshoreMale + onshoreFemale)) * 100,
            )}%` +
            ')',
        },
        plugins: {
          datalabels: {
            display: false,
            color: 'white',
          },
        },
        tooltips: {
          enabled: false,
        },
      };

      const offShoreOptions = {
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 10,
            right: 0,
            top: 10,
            bottom: 0,
          },
        },
        title: {
          display: true,
          position: 'bottom',
          fontSize: 16,
          text:
            'Offshore(' +
            `${Math.round(
              (offshoreFemale / (offshoreMale + offshoreFemale)) * 100,
            )}%` +
            ')',
        },
        plugins: {
          datalabels: {
            display: false,
            color: 'white',
          },
        },
        tooltips: {
          enabled: false,
        },
      };

      const totalOptions = {
        maintainAspectRatio: false,
        responsive: true,
        fullWidth: true,
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          labels: {
            display: true,
            fontSize: 10,
            boxWidth: 10,
          },
          onClick() {},
        },
        plugins: {
          datalabels: {
            display: false,
            color: 'white',
          },
        },
        tooltips: {
          enabled: false,
        },
      };

      const billableOptions = {
        cutoutPercentage: 60,
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10,
          },
        },
        tooltips: {
          enabled: false,
        },
        legend: {
          display: true,
          position: 'right',
          align: 'center',
          labels: {
            display: true,
            fontSize: 32,
            fontColor: '#36A2EB',
            boxWidth: 0,
          },
          onClick: () => {
            this.LoadingBar.continuousStart();
            this.EmpReport();
          },
        },
        plugins: {
          datalabels: {
            display: false,
            color: 'white',
          },
        },
        title: {
          display: false,
        },
      };

      const monthlyDataBar = {
        labels: _.reverse(Object.keys(billableList)),
        datasets: [
          {
            type: 'line',
            label: 'Count',
            borderColor: '#09488c',
            borderWidth: 2,
            fill: false,
            datalabels: {
              display: false,
            },
            data: _.reverse(Object.values(billableList)),
          },
          {
            type: 'bar',
            label: 'Count',
            backgroundColor: '#36A2EB',
            data: _.reverse(Object.values(billableList)),
          },
        ],
      };

      // Bandwise distribution
      const bandWiseBarData = {
        labels: ['Band 5', 'Band 6', 'Band 7', 'Band 8', 'Band 9'],
        datasets: [
          {
            label: 'Count',
            backgroundColor: '#36A2EB',
            borderColor: '#2971c0',
            borderWidth: 1,
            data: [Band5.true, Band6.true, Band7.true, Band8.true, Band9.true],
          },
        ],
      };
      const offboardingVsonboardingData = {
        labels: _.reverse(Object.keys(onboardingList)),
        datasets: [
          {
            type: 'bar',
            label: 'Onboarding',
            backgroundColor: '#36A2EB',
            borderWidth: 2,
            fill: false,
            datalabels: {
              color: 'white',
            },
            data: _.reverse(Object.values(onboardingList)),
          },
          {
            type: 'bar',
            label: 'Offboarding',
            backgroundColor: '#D6EAF8',
            datalabels: {
              color: 'black',
            },
            data: _.reverse(Object.values(offboardingList)),
          },
        ],
      };

      this.setState({
        empArrtable,
        empArrtableSecond,
        onshore,
        offshore,
        totalEmployee,
        Band5,
        Band6,
        Band7,
        Band8,
        Band9,
        totalEmp,
        onshoreGenderDonut,
        offshoreGenderDonut,
        billableHCdata,
        totalOptions,
        onShoreOptions,
        billableOptions,
        offShoreOptions,
        monthlyDataBar,
        bandWiseBarData,
        offboardingVsonboardingData,
      });
    }
  }

  EmpReport() {
    var empCSV = [];
    this.setState({ loadingCSV: true });

    const totalEmployee = this.props.allemployee
      ? this.props.allemployee.rows.filter(
          item =>
            item.doc.IsDeleted == 'false' &&
            item.doc.Billable !== 'Y' &&
            (item.doc.Status === 'Onboarded' ||
              item.doc.Status === 'Offboarding'),
        )
      : [];

    totalEmployee.forEach(function(item) {
      if (item && item.doc && item.doc.IBMID) {
        empCSV.push(item.doc);
      }
    });

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(empCSV);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'EmployeeRecord' + fileExtension);
    this.setState({ loadingCSV: false });
    this.LoadingBar.complete();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allemployee !== this.props.allemployee &&
      this.props.allemployee
    ) {
      this.formatData();
      this.LoadingBar.complete();
    }
  }

  componentDidMount() {
    this.props.getAllEmployee();
    this.LoadingBar.continuousStart();
    this.formatData();
  }

  render() {
    Moment.locale('en');

    return (
      <div className="dasboard-main">
        <LoadingBar
          height={5}
          color="#36A2EB"
          onRef={ref => (this.LoadingBar = ref)}
        />
        <div className="row">
          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12 menu-siderbar">
            <ul
              className="dropdown-menu-vertical"
              style={{ display: 'inline-table', width: '100%' }}
            >
              <li className="nav-item">
                <Link to="/employee" className="nav-link">
                  Employee Master
                </Link>
              </li>

              {this.state.login_resp.logintypes != 'normal' && (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Financials
                  </a>
                  <ul>
                    <li className="nav-item">
                      <Link to="/ilc-import" className="nav-link">
                        ILC Import
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/ilc-master" className="nav-link">
                        ILC Master
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Forecast Master
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Reports
                </a>
                <ul>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Employee Master
                    </a>

                    <ul>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Employee Master Reports
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link to="/financial-report" className="nav-link">
                          Capacity Reports
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          SLT Ops Reports
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="nav-item">
                      <Link to="/login-master" className="nav-link">
                        Login Master
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link to="/financial-report" className="nav-link">
                      Capacity Reports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/financial-report" className="nav-link">
                      SLT Weekly Reports
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/financial-report" className="nav-link">
                      Financials Reports
                    </Link>
                  </li>
                </ul>
              </li>
              {this.state.login_resp.logintypes == 'admin' && (
                <li className="nav-item">
                  <Link to="/audit-log" className="nav-link">
                    Audit log
                  </Link>
                </li>
              )}
              {this.state.login_resp.logintypes == 'admin' && (
                <li className="nav-item">
                  <Link to="/login-master" className="nav-link">
                    Login Master
                  </Link>
                </li>
              )}
               <li className="nav-item">
                  <Link to="/landed-resource-list" className="nav-link">
                    Landed Resource
                  </Link>
                </li>
            </ul>

            {this.props.allemployee && (
              <div
                className="sub-dash-header chart-box"
                style={{ display: 'inline-block', width: '100%' }}
              >
                <div className="col-sm-12 chart-box-title">
                  <h6>Billable HCs %age</h6>
                </div>
                <div className="col-sm-12 pie-area">
                  <div className="row">
                    <div className="col-sm-12">
                      <Doughnut
                        data={this.state.billableHCdata}
                        options={this.state.billableOptions}
                        height={100}
                        width={200}
                        ///  handleChartClick={element => this.EmpReport(element)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.props.allemployee && (
              <div
                className="sub-dash-header chart-box"
                style={{ display: 'inline-block', width: '100%' }}
              >
                <div className="col-sm-12 chart-box-title">
                  <h6>Gender equality %Female</h6>
                </div>
                <div className="col-sm-12 pie-area">
                  <div className="row">
                    <div className="col-sm-6">
                      <Doughnut
                        data={this.state.onshoreGenderDonut}
                        options={this.state.onShoreOptions}
                        height={120}
                        width={200}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Doughnut
                        data={this.state.offshoreGenderDonut}
                        options={this.state.offShoreOptions}
                        height={120}
                        width={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!this.props.allemployee && (
            <div className="col-xl-10 col-lg-8 col-md-8 col-sm-12 container">
              <h1>Loading...</h1>
            </div>
          )}
          {this.props.allemployee && (
            <div className="col-xl-10 col-lg-8 col-md-8 col-sm-12 container">
              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 midColumn">
                  <div className="sub-stats-header">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-md-6 col-lg-3">
                            {/* <button onClick={() => this.LoadingBar.continuousStart()}>
          Start Continuous Bar Loading
        </button> */}
                            <div className="card">
                              <div className="card-body">
                                <h5 className="text-center card-title">
                                  Total
                                </h5>
                                <p className="text-center card-text h1">
                                  <span className="badge badge-pill badge-info text-heading">
                                    {this.state.totalEmployee}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="text-center card-title">
                                  Onshore
                                </h5>
                                <p className="text-center card-text h1">
                                  <span
                                    className="badge badge-pill badge-success"
                                    style={{ backgroundColor: '#36A2EB' }}
                                  >
                                    {this.state.onshore}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="text-center card-title">
                                  Offshore
                                </h5>
                                <p className="text-center card-text h1">
                                  <span
                                    className="badge badge-pill badge-info"
                                    style={{ backgroundColor: '#2874A6' }}
                                  >
                                    {this.state.offshore}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <Doughnut
                              data={this.state.totalEmp}
                              options={this.state.totalOptions}
                              height={200}
                              width={350}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sub-dash-header chart-box">
                    <div className="col-lg-12 chart-box-title">
                      <h6>Monthly Account HCs</h6>
                    </div>
                    <div className="col-lg-12 chart-area">
                      <Bar
                        data={this.state.monthlyDataBar}
                        options={{
                          maintainAspectRatio: false,
                          fullWidth: true,
                          legend: {
                            display: false,
                          },
                          plugins: {
                            datalabels: {
                              display: true,
                              align: 'top',
                              color: 'white',
                            },
                          },
                          scales: {
                            plugins: {
                              datalabels: {
                                display: true,
                              },
                            },
                            yAxes: [
                              {
                                ticks: {
                                  beginAtZero: true,
                                },
                              },
                            ],
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="sub-dash-header chart-box">
                    <div className="col-lg-12 chart-box-title">
                      <h6>Band Wise Distribution</h6>
                    </div>
                    <div className="col-lg-12 chart-area">
                      <Bar
                        data={this.state.bandWiseBarData}
                        options={{
                          maintainAspectRatio: false,
                          fullWidth: true,
                          legend: {
                            display: false,
                          },
                          labels: {
                            render: 'percentage',
                          },
                          plugins: {
                            datalabels: {
                              display: true,
                              color: 'white',
                              align: 'middle',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-6 col-lg-12 col-md-12 col-sm-12"
                  style={{ paddingLeft: '0px' }}
                >
                  <div
                    className="sub-stats-header chart-box"
                    style={{ marginTop: 15 }}
                  >
                    <div className="col-lg-12 chart-box-title">
                      <h6>Onboarding Vs Offboarding</h6>
                    </div>
                    <div className="col-lg-12 list-table">
                      <Bar
                        data={this.state.offboardingVsonboardingData}
                        options={{
                          maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          clamp: true,
                          plugins: {
                            datalabels: {
                              display: true,
                              align: 'center',
                            },
                          },
                          responsive: true,
                          scales: {
                            xAxes: [
                              {
                                stacked: true,
                              },
                            ],
                            yAxes: [
                              {
                                stacked: true,
                              },
                            ],
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="sub-stats-header chart-box">
                    <div className="col-lg-12 chart-box-title">
                      <h6>Latest Onboarding</h6>
                    </div>
                    <div
                      className="col-lg-12 list-table"
                      style={{ padding: 0 }}
                    >
                      <BootstrapTable
                        data={this.state.empArrtable}
                        striped
                        hover
                        size=""
                      >
                        <TableHeaderColumn isKey dataField="AccountOnboardDate">
                          Onboarding Date
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="EmployeeName">
                          Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="ContractService">
                          Portfolio
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="Location">
                          Location
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>

                  <div className="sub-stats-header chart-box">
                    <div className="col-lg-12 chart-box-title">
                      <h6>Latest Offboarding</h6>
                    </div>
                    <div
                      className="col-lg-12 list-table"
                      style={{ padding: 0 }}
                    >
                      <BootstrapTable
                        data={this.state.empArrtableSecond}
                        striped
                        hover
                        size="sm"
                      >
                        <TableHeaderColumn isKey dataField="OffboardDate">
                          Offboarding Date
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="EmployeeName">
                          Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="ContractService">
                          Portfolio
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="Location">
                          Location
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withSaga = injectSaga({ key: 'dashboard', saga });

const mapStateToProps = createStructuredSelector({
  allemployee: makeSelectAllEmployee(),
  login_response: makeSelectLoginResponse(),
  user_right: makeSelectUserRightResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllEmployee: () => {
      dispatch(getAllEmployee());
    },
  };
}

export default compose(
  withSaga,
  withConnect,
)(Dashboard);
