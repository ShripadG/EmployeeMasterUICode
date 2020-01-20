/**
 *
 * LandedResourceList
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
import { push } from 'react-router-redux';
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from 'react-bootstrap-table';
import csvDownload from 'json-to-csv-export';
import { ToastContainer, toast } from 'react-toastify';
import { makeSelectLoginResponse } from '../LoginForm/selectors';
import Moment from 'moment';
import {
  getAllEmployee,
  getEmployee,
  deleteEmployee,
  clearPerson,
} from './actions';

import {
  makeSelectAllEmployee,
  makeSelectEmployee,
  makeSelectEmployeeLoading,
} from './selectors';
import {
  makeSelectEmployeeActionType,
  makeSelectEmployeeApiResponse,
  makeSelectEmployeeMethodType,
} from '../EmployeeForm/selectors';

import DeleteConfirmation from './delete-confirmation';
import saga from './saga';
import '../../css/employee.css';
import { EMPLOYEE_API_URL } from '../../utils/constants';

import { setDateFormat } from 'utils/commonMethods';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class LandedResourceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirmation: false,
      person: [],
      loadingCSV: false,
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.EmpReport = this.EmpReport.bind(this);
  }
  showDeleteConfirmation = person =>
    this.setState({
      showDeleteConfirmation: true,
      person,
    });

  hideDeleteConfirmation = () =>
    this.setState({
      showDeleteConfirmation: false,
      person: [],
    });

  componentWillMount() {
    if (!this.props.allemployee) {
      this.props.getAllEmployee();
    }
  }

  componentDidMount() {
    if (!this.props.login_response) {
     // this.props.dispatch(push('/'));
    }
    toast.configure({
      autoClose: 8000,
      draggable: false,
      // etc you get the idea
    });

    if (this.props.api_response && this.props.api_response.ok) {
      if (this.props.method_type === 'PUT') {
        toast.success('LandedResourceList record has been updated successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (this.props.method_type === 'POST') {
        toast.success('LandedResourceList record has been created successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }

  EmpReport() {
    var empCSV = [];
    this.setState({ loadingCSV: true });
    fetch(EMPLOYEE_API_URL)
      .then(response => response.json())
      .then(resData => {
        resData.rows.forEach(function(item) {
          if (item && item.doc && item.doc.IBMID) {
            empCSV.push(item.doc);
          }
        });
        //rename header
        let updatedEmpCSV = empCSV.map(function(obj) {
          return {
            ID: obj.Id,
            IBMID: obj.IBMID,
            'HCAM ID': obj.HCAMID,
            'C-ID': obj.CID,
            'Employee Name': obj.EmployeeName,
            'IBM Email ID': obj.IBMEmailID,
            'Nationwide Email ID': obj.NationwideEmailID,
            Gender: obj.Gender,
            Status: obj.Status,
            'Role@IBM': obj.RoleAtIBM,
            'Contract/Service': obj.ContractService,
            DGDC: obj.DGDC,
            'DGDC Squad': obj.DGDCSquad,
            'PortfolioLead Offshore': obj.PortfolioLeadOffshore,
            Country: obj.Country,
            LOB: obj.LOB,
            'Employee Type': obj.EmployeeType,
            'Work Location': obj.WorkLocation,
            'Current Work Location': obj.CurrentWorkLocation,
            'Location Status': obj.LocationStatus,
            'Band on Joining Nationwide': obj.BandonJoiningNationwide,
            'Current Band': obj.CurrentBand,
            'Account Onboard Date': obj.AccountOnboardDate
              ? obj.AccountOnboardDate.toString().slice(0, 11)
              : '',
            'Onboarding Request Received Date': obj.OnboardingReqRecdDate
              ? obj.OnboardingReqRecdDate.toString().slice(0, 11)
              : '',
            'Account Offboarding Offboarded Date': obj.AccountOffboardingOffboardedDate
              ? obj.AccountOffboardingOffboardedDate.toString().slice(0, 11)
              : '',
            'Offboarding Request Received Date': obj.OffboardingReqRecdDate
              ? obj.OffboardingReqRecdDate.toString().slice(0, 11)
              : '',
            'Reason for Leaving': obj.ReasonforLeaving,
            'Source of Information': obj.SourceofInformation,
            Remarks: obj.Remarks,
            'Row Added Date': obj.RowAddedDate
              ? obj.RowAddedDate.toString().slice(0, 11)
              : '',
            Billable: obj.Billable,
            FTE: obj.FTE,
            'Weekly Hours': obj.WeeklyHours,
            'Role Level': obj.RoleLevel,
            'Daily Rate Price': obj.DailyRatePrice,
            'Daily Cost': obj.DailyCost,
            'Date updated': obj.dateupdated,
            'NBS Cost Centre': obj.NBSCostCentre,
            'Service Type': obj.ServiceType,
            'Service Type Breakdown': obj.ServiceTypeBreakdown,
            'NBS JRSS': obj.NBSJRSS,
            'Billing Role': obj.BillingRole,
            'Method Of Work': obj.MethodOfWork,
          };
        });

       // csvDownload(updatedEmpCSV, 'EmployeeRecord.csv');
       const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
       const fileExtension = '.xlsx';
       const ws = XLSX.utils.json_to_sheet(updatedEmpCSV);
       const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
       const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
       const data = new Blob([excelBuffer], {type: fileType});
       FileSaver.saveAs(data, 'EmployeeRecord' + fileExtension);
        this.setState({ loadingCSV: false });
      });
  }

  onRefresh() {
    this.props.getAllEmployee();
    toast.success('We are refreshing our record.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && this.props.loading) {
      this.hideDeleteConfirmation();
    }
  }

  onAddClick() {
    this.props.clearPerson();
    this.props.dispatch(push('/employee-form'));
  }

  onEditClick(person) {
    this.props.getEmployee(person.pid);
  }
  onRowSelect(person) {
    this.props.getEmployee(person.pid);
  }

  onDeleteClick(person) {
    this.showDeleteConfirmation(person);
  }

  createCustomButtonGroup = props => {
    return (
      <div>
        <ButtonGroup className="my-custom-class">
          <Button
            size="sm"
            className="btn btn-warning"
            onClick={() => this.onAddClick()}
          >
            Add new Employee
          </Button>
          <Button
            size="sm"
            className="btn btn-danger"
            onClick={() => this.onRefresh()}
          >
            Refresh
          </Button>
          <Button onClick={() => this.EmpReport()}>Export Record</Button>
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

  onDeleteConfirm(empdata) {
    this.props.deleteEmployee(empdata);
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
    const { allemployee } = this.props;
    const { showDeleteConfirmation } = this.state;

    const empArrtable = [];
    if (allemployee && allemployee.rows && allemployee.rows.length > 0) {
      // allemployee.rows.forEach(function(value, i) {
      allemployee.rows.forEach(function(value, i) {
        if (value && value.doc && value.doc.IBMID) {
          empArrtable.push({
            pid: value.id,
            cid: value.doc.CID,
            imbid: value.doc.IBMID,
            emp_name: value.doc.EmployeeName,
            ibm_email: value.doc.IBMEmailID,
            status: value.doc.Status,
            nationwide_email: value.doc.NationwideEmailID,
            emptype: value.doc.EmployeeType,
            contract: value.doc.ContractService,
            dgdc: value.doc.DGDC,
            c_w_l: value.doc.CurrentWorkLocation,
            revid: value.doc._rev,
            IsDeleted: value.doc.IsDeleted,
            AccountOnboardDate: value.doc.AccountOnboardDate,
            band: value.doc.CurrentBand,
            RowAddedDate: Moment(setDateFormat(value.doc.RowAddedDate)).valueOf(),
            RowDate: setDateFormat(value.doc.RowAddedDate),
          });
        }
      });
    }

    const options = {
      noDataText: 'Loading...',
      onRowClick: this.onRowSelect,
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
      //defaultSortName: 'RowAddedDate',  // default sort column name
      //defaultSortOrder: 'desc'
    };
    

    return (
      <div className="background-image">
        <ToastContainer />
        <DeleteConfirmation
          empdata={this.state.person}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
          onDeleteConfirm={this.onDeleteConfirm}
        />
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
            <TableHeaderColumn
              dataField=""
              dataAlign="center"
              dataSort
              width="100"
              hidden={true}
            >
              Last Updated Date
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="RowDate"
              dataAlign="center"
              width="100"
            >
              Transaction Type
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="imbid"
              dataAlign="center"
              isKey
              dataSort
              width="100"
            >
              Emp Name
            </TableHeaderColumn>
            
            

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Emp No
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              NBS CID
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              IBM Role
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Current Loc
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Squad
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Old Rate Type
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              New Rate Type
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              HCAM SrNo
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Onshore Lead
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Offshore Lead
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Status
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Date Of Return
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              Service Type
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              DC Name
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="imbid"
              csvText="CSV IBM ID"
              dataSort
              width="100"
            >
              DC Name
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="action"
              dataFormat= {this.actionFormatter.bind(this)}
              width="80"
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

LandedResourceList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allemployee: makeSelectAllEmployee(),
  employee: makeSelectEmployee(),
  loading: makeSelectEmployeeLoading(),
  action_type: makeSelectEmployeeActionType(),
  api_response: makeSelectEmployeeApiResponse(),
  method_type: makeSelectEmployeeMethodType(),
  login_response: makeSelectLoginResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllEmployee: () => {
      dispatch(getAllEmployee());
    },
    clearPerson: () => {
      dispatch(clearPerson());
    },
    getEmployee: empid => {
      dispatch(getEmployee(empid));
    },
    deleteEmployee: row => {
      dispatch(deleteEmployee(row.pid, row.revid));
    },
  };
}

const withSaga = injectSaga({ key: 'landedResourceList', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(LandedResourceList);
