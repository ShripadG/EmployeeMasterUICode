/**
 *
 * ILCMaster
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from 'react-bootstrap-table';

import { ToastContainer, toast } from 'react-toastify';
import { getAllILC, getILC, clearILC } from './actions';

import {
  makeSelectAllILC,
  makeSelectOneILC,
  makeSelectILCActionType,
  makeSelectILCApiResponse,
  makeSelectILCMethodType,
} from './selectors';
import { makeSelectLoginResponse } from '../LoginForm/selectors';
import { push } from 'react-router-redux';

import saga from './saga';
import '../../css/employee.css';
import '../../css/login.css';

class ILCMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  componentWillMount() {
    if (!this.props.allilc) {
      this.props.getAllILC();
    }
  }

  componentDidMount() {
    toast.configure({
      autoClose: 8000,
      draggable: false,
      // etc you get the idea
    });

    if (!this.props.login_response) {
      this.props.dispatch(push('/'));
   }
  }

  onRefresh() {
    this.props.getAllILC();
    toast.success('We are refreshing our records.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  onEditClick(ilcdata) {
    this.props.getILC(ilcdata.id);
  }

  onRowSelect(user) {
    this.props.getILC(user.id);
  }

  createCustomButtonGroup = props => (
    <ButtonGroup className="my-custom-class">
      <Button
        size="sm"
        className="btn btn-danger"
        onClick={() => this.onRefresh()}
      >
        Refresh
      </Button>
    </ButtonGroup>
  );

  actionFormatter(cell, row) {
    return (
      <div>
        <ButtonGroup>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => this.onEditClick(row)}
          >
            Edit
          </Button>
        </ButtonGroup>
      </div>
    );
  }

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
      position: toast.POSITION.TOP_RIGHT,
    });

  render() {
    const { allilc } = this.props;
    const userArrtable = [];
    if (allilc && allilc.rows && allilc.rows.length > 0) {
      allilc.rows.forEach(function(value, i) {
        if (value && value.doc) {
          userArrtable.push({
            empSerNum: value.doc.EmpSerNum,
            empName: value.doc.EmpName,
            empLastName: value.doc.EmpLastName,
            accountID: value.doc.AccountId,
            activityCD: value.doc.ActivityCd,
            weekEndingDate: value.doc.WeekEndingDate,
            totalHrs: value.doc.TotalHours,
            satHrs: value.doc.SatHoursExpended,
            sunHrs: value.doc.SunHoursExpended,
            monHrs: value.doc.MonHoursExpended,
            tueHrs: value.doc.TueHoursExpended,
            wedHrs: value.doc.WedHoursExpended,
            thuHrs: value.doc.ThuHoursExpended,
            friHrs: value.doc.FriHoursExpended,
            id: value.id,
          });
        }
      });
    }

    const userRoleOptions = {
      super: 'super',
      admin: 'admin',
      normal: 'normal',
    };

    const options = {
      noDataText: 'Loading...',
      // onRowClick: this.onRowSelect,
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
    };

    return (
      <div className="background-image">
        <div className="table-heading-bt">
          <h4 className="header-colors">ILC List Details</h4>
        </div>
        <ToastContainer />
        <div className="bootstp-tables">
          <BootstrapTable
            data={userArrtable}
            striped
            hover
            options={options}
            search
            pagination
            bootstrap4
            wrapperClasses="table-responsive"
          >
            <TableHeaderColumn
              dataField="empSerNum"
              dataAlign="center"
              isKey
              dataSort
              width="80"
            >
              Employee <br />
              Serial #
            </TableHeaderColumn>

            <TableHeaderColumn dataField="empName" dataSort width="150">
              Employee Name
            </TableHeaderColumn>

            <TableHeaderColumn dataField="empLastName" dataSort width="150">
              Employee <br />
              Last Name
            </TableHeaderColumn>

            <TableHeaderColumn dataField="accountID" dataSort width="80">
              Account <br />
              ID
            </TableHeaderColumn>

            <TableHeaderColumn dataField="activityCD" dataSort width="80">
              Activity <br />
              CD
            </TableHeaderColumn>

            <TableHeaderColumn dataField="weekEndingDate" dataSort width="100">
              W/E Date
            </TableHeaderColumn>

            <TableHeaderColumn dataField="totalHrs" dataSort width="70">
              Total <br />
              Hrs
            </TableHeaderColumn>

            <TableHeaderColumn dataField="satHrs" dataSort width="70">
              Sat
            </TableHeaderColumn>

            <TableHeaderColumn dataField="sunHrs" dataSort width="70">
              Sun
            </TableHeaderColumn>

            <TableHeaderColumn dataField="monHrs" dataSort width="70">
              Mon
            </TableHeaderColumn>

            <TableHeaderColumn dataField="tueHrs" dataSort width="70">
              Tue
            </TableHeaderColumn>

            <TableHeaderColumn dataField="wedHrs" dataSort width="70">
              Wed
            </TableHeaderColumn>

            <TableHeaderColumn dataField="thuHrs" dataSort width="70">
              Thu
            </TableHeaderColumn>

            <TableHeaderColumn dataField="friHrs" dataSort width="70">
              Fri
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="action"
              dataFormat={this.actionFormatter.bind(this)}
              width="120"
              export={false}
            >
              Action
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <div />
      </div>
    );
  }
}

ILCMaster.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allilc: makeSelectAllILC(),
  one_ilc: makeSelectOneILC(),
  action_type: makeSelectILCActionType(),
  api_response: makeSelectILCApiResponse(),
  method_type: makeSelectILCMethodType(),
  login_response: makeSelectLoginResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllILC: () => {
      dispatch(getAllILC());
    },
    clearILC: () => {
      dispatch(clearILC());
    },
    getILC: ilcid => {
      dispatch(getILC(ilcid));
    },
  };
}

const withSaga = injectSaga({ key: 'user', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(ILCMaster);
