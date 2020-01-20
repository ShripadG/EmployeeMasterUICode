/**
 * 
 * Audit Log
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import Moment from 'moment';
import { setDateFormat, setDateFormatApi } from 'utils/commonMethods';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from 'react-bootstrap-table';

import { makeSelectLoginResponse } from '../LoginForm/selectors';
import { push } from 'react-router-redux';

import { ToastContainer, toast } from 'react-toastify';
import {
  getAllAuditLog
} from './actions';

import {
  makeSelectAllAuditLog,
  makeSelectAuditLogApiResponse,
  makeSelectAuditLogLoading,
} from './selectors';

import saga from './saga';
import '../../css/employee.css';
import { AUDIT_LOG_API_URL } from '../../utils/constants';
import csvDownload from 'json-to-csv-export';

class AuditLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCSV: false
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.AuditReport = this.AuditReport.bind(this);
  }

  componentWillMount() {
    toast.configure({
      autoClose: 8000,
      draggable: false,
      // etc you get the idea
    });
  }

  componentDidMount() {
    if (!this.props.allAuditLog) {
      this.props.getAllAuditLog();
    }
    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
   }
  }

  AuditReport() {
    this.setState({loadingCSV:true});
    fetch(AUDIT_LOG_API_URL)
      .then(response => response ? response.json() : [])
      .then(resData => {
        const removeProps = {
          empid: null,
          loginid: null,
          eventname: null,
          datetime: null
        };

        const exportData = _.flatMapDepth(resData.rows, item => item.doc, 2);
        
        const result = _.map(exportData, item => {
          return _.pick(item, _.keys(removeProps))
        });

        //rename header
        let exportResult = result.map(function (obj) {
          return {
            'Employee ID': obj.empid,
            'Login ID': obj.loginid,
            'Event Name': obj.eventname,
            'Date Time': obj.datetime
          };
        });

        csvDownload(exportResult, 'AuditLog.csv');

        this.setState({loadingCSV:false});
      })
      .catch(() => {
        this.setState({ loadingCSV: false });
        toast.error('Something gone wrong. Please try again.', {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  }

  onRefresh() {
    this.props.getAllAuditLog();
    toast.success('We are refreshing our record.', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  createCustomButtonGroup = props => {
    return (
    <div>
      <ButtonGroup className="my-custom-class">
        <Button
          size="sm"
          className="btn btn-danger"
          onClick={() => this.onRefresh()}
        >
          Refresh
        </Button>
          <Button onClick={() => this.AuditReport()}>Export All to CSV</Button>
        </ButtonGroup>
        {this.state.loadingCSV && (
          <h4>
            Please wait.......
            <div className="spinner-border" role="status" />
          </h4>
        )}
      </div>
    );
  };

  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };


  renderSizePerPageDropDown = props => (
    <SizePerPageDropDown
      className="my-size-per-page"
      btnContextual="btn-secondary"
      variation="dropdown"
      {...props}
      onClick={e => {
        e.preventDefault();
        this.onToggleDropDown(props.toggleDropDown);
      }}
    />
  );

  notify = () =>
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT
    });

  render() {
    Moment.locale('en');
    const { allAuditLog } = this.props;
    
    const empArrtable = [];
    if (allAuditLog && allAuditLog.rows && allAuditLog.rows.length > 0) {

      allAuditLog.rows.forEach(function (value, i) {
        empArrtable.push({
          eventname: value.doc.eventname,
          empid: value.doc.empid,
          loginid: value.doc.loginid,
          datetime: Moment(value.doc.datetime).format(
            'DD-MM-YYYY hh:mm:ss'
          )}
        );
      });
    }

    const options = {
      noDataText: 'No data to display',
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      btnGroup: this.createCustomButtonGroup,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      sizePerPageList: [10, 25, 50, 100, 300],
      sizePerPage: 10,
      prePage: '< Prev', // Previous page button text
      nextPage: 'Next >', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last',
      defaultSortName: 'datetime',  // default sort column name
      defaultSortOrder: 'desc'
    };

    return (
      <div className= "background-image">
        <ToastContainer />
        
        <div className="bootstp-table">
          <BootstrapTable
            data={empArrtable}
            striped
            hover
            options={options}
            search
            exportCSV
            pagination
            bootstrap4
            wrapperClasses="table-responsive"
          >
            <TableHeaderColumn dataField="empid"
              isKey={true}
              csvFormat="string"
              csvHeader="Employee ID"
            dataSort width="200">
            Employee Id 
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="loginid"
              csvHeader="Login ID"
              dataSort width="200">
              Login ID
          </TableHeaderColumn>


            <TableHeaderColumn
              dataField="eventname"
              csvHeader="Employee Name"
            dataSort width="200">
            Event Name
          </TableHeaderColumn>

            <TableHeaderColumn
              dataField="datetime"
              csvHeader="Date Time"
              dataSort width="200">
              Date Time
          </TableHeaderColumn>

          </BootstrapTable>
        </div>
        <div />
      </div>
    );
  }
}

AuditLog.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  allAuditLog: makeSelectAllAuditLog(),
  loading: makeSelectAuditLogLoading(),
  api_response: makeSelectAuditLogApiResponse(),
  login_response: makeSelectLoginResponse(),
});

const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only ">Loading...</span>
      </div>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllAuditLog: () => {
      dispatch(getAllAuditLog());
    }
  };
}

const withSaga = injectSaga({ key: 'auditlog', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withSaga,
  withConnect
)(AuditLog);
