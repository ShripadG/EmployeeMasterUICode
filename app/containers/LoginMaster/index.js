/**
 *
 * LoginMaster
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

import { ToastContainer, toast } from 'react-toastify';
import { getAllUser, getUser, deleteUser, clearUser } from './actions';

import {
  makeSelectAllUser,
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectUserActionType,
  makeSelectUserApiResponse,
  makeSelectUserMethodType,
} from './selectors';

import { makeSelectRegistrationResponse } from '../RegistrationForm/selectors';

import DeleteConfirmation from './delete-confirmation';
import saga from './saga';
import '../../css/employee.css';
import '../../css/login.css';

import { makeSelectLoginResponse } from '../LoginForm/selectors';

class LoginMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirmation: false,
      user: [],
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.deleteSuccessToast = this.deleteSuccessToast.bind(this);
  }

  showDeleteConfirmation = user =>
    this.setState({
      showDeleteConfirmation: true,
      user,
    });

  hideDeleteConfirmation = () =>
    this.setState({
      showDeleteConfirmation: false,
      user: [],
    });

  componentWillMount() {
    if (!this.props.alluser) {
      this.props.getAllUser();
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
    if (
      this.props.registration_response &&
      this.props.registration_response[0]
    ) {
      toast.success('User already exists', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  deleteSuccessToast() {
    if (!toast.isActive(this.props.api_response.id)) {
      toast.success('User record has been deleted successfully', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: this.props.api_response.id,
      });
    }
  }

  onRefresh() {
    this.props.getAllUser();
    toast.success('We are refreshing our record.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  componentDidUpdate(prevProps) {
    setTimeout(
      function() {
        if (
          prevProps.api_response != this.props.prevProps &&
          (this.props.api_response && this.props.api_response.ok)
        ) {
          if (this.props.method_type === 'DELETE') {
            this.deleteSuccessToast();
          }
        }
      }.bind(this),
      1000,
    );
    if (prevProps.loading !== this.props.loading && this.props.loading) {
      this.hideDeleteConfirmation();
    }
    // if (
    //   prevProps.login_response !== this.props.login_response &&
    //   this.props.login_response
    // ) {
    // }
  }

  onAddClick() {
    this.props.clearUser();
    this.props.dispatch(push('/registration'));
  }

  onEditClick(user) {
    this.props.getUser(user.id);
  }

  onRowSelect(user) {
    this.props.getUser(user.id);
  }

  onDeleteClick(user) {
    this.showDeleteConfirmation(user);
  }

  createCustomButtonGroup = props => (
    <ButtonGroup className="my-custom-class">
      <Button
        size="sm"
        className="btn btn-warning"
        onClick={() => this.onAddClick()}
      >
        Add new User
      </Button>
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
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => this.onDeleteClick(row)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  onDeleteConfirm(userdata) {
    this.props.deleteUser(userdata);
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
    const { alluser } = this.props;

    const { showDeleteConfirmation } = this.state;

    const userArrtable = [];
    if (alluser && alluser.rows && alluser.rows.length > 0) {
      alluser.rows.forEach(function(value, i) {
        if (value && value.doc && value.doc.Username) {
          userArrtable.push({
            Username: value.doc.Username,
            EmailID: value.doc.EmailID,
            Type: value.doc.Type,
            id: value.doc._id,
            rev: value.doc._rev,
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
          <h4 className="header-colors">User List Details</h4>
        </div>
        <ToastContainer />
        <DeleteConfirmation
          userdata={this.state.user}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
          onDeleteConfirm={this.onDeleteConfirm}
        />

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
              dataField="Username"
              dataAlign="center"
              isKey
              dataSort
              width="200"
              filter={{ type: 'TextFilter', delay: 1000, placeholder: ' ' }}
            >
              USERNAME
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="EmailID"
              dataSort
              width="300"
              filter={{ type: 'TextFilter', delay: 1000, placeholder: ' ' }}
            >
              EMAIL-ID
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="Type"
              dataSort
              width="200"
              formatExtraData={userRoleOptions}
              filter={{
                type: 'SelectFilter',
                options: userRoleOptions,
                placeholder: ' ',
              }}
            >
              ROLE TYPE
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="action"
              dataFormat={this.actionFormatter.bind(this)}
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

LoginMaster.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  alluser: makeSelectAllUser(),
  user: makeSelectUser(),
  loading: makeSelectUserLoading(),
  action_type: makeSelectUserActionType(),
  api_response: makeSelectUserApiResponse(),
  method_type: makeSelectUserMethodType(),
  login_response: makeSelectLoginResponse(),
  registration_response: makeSelectRegistrationResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllUser: () => {
      dispatch(getAllUser());
    },
    clearUser: () => {
      dispatch(clearUser());
    },
    getUser: userid => {
      dispatch(getUser(userid));
    },
    deleteUser: row => {
      dispatch(deleteUser(row));
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
)(LoginMaster);
