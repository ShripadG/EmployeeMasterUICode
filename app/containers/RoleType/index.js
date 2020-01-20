/**
 *
 * RoleType
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
import { getAllROLETYPE } from './actions';

import { makeSelectAllROLETYPE } from './selectors';

import saga from './saga';
import '../../css/employee.css';
import '../../css/login.css';

class RoleType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    if (!this.props.allroletype) {
      this.props.getAllROLETYPE();
    }
  }

  componentDidMount() {
    toast.configure({
      autoClose: 8000,
      draggable: false,
    });
  }

  onRefresh() {
    this.props.getAllROLETYPE();
    toast.success('We are refreshing our records.', {
      position: toast.POSITION.TOP_RIGHT,
    });
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
    const { allroletype } = this.props;
    const userArrtable = [];
    if (allroletype && allroletype.rows && allroletype.rows.length > 0) {
      allroletype.rows.forEach(function(value, i) {
        if (value && value.doc) {
          userArrtable.push({
            login_type: value.doc.logintypes,
            empmaster: value.doc.EmployeeMaster,
            forcastmaster: value.doc.ForcastMaster,
            reports: value.doc.Reports,
            ilcmaster: value.doc.ILCMaster,
            financials: value.doc.Financials,
            loginMaster: value.doc.LoginMaster,
            id: value.id,
          });
        }
      });
    }

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
        <div>
          <h4 className="header-colors">RoleType List Details</h4>
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
              dataAlign="center"
              isKey
              dataSort
              dataField="login_type"
              width="80"
            >
              Role Type
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="empmaster"
              dataAlign="center"
              width="80"
            >
              EmployeeMaster
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="forcastmaster"
              dataAlign="center"
              dataSort
              width="80"
            >
              ForcastMaster
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="reports"
              dataAlign="center"
              dataSort
              width="80"
            >
              Reports
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="ilcmaster"
              dataAlign="center"
              dataSort
              width="80"
            >
              ILCMaster
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="financials"
              dataAlign="center"
              dataSort
              width="80"
            >
              Financials
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="loginMaster"
              dataAlign="center"
              dataSort
              width="80"
            >
              LoginMaster
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <div />
      </div>
    );
  }
}

RoleType.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allroletype: makeSelectAllROLETYPE(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllROLETYPE: () => {
      dispatch(getAllROLETYPE());
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
)(RoleType);
