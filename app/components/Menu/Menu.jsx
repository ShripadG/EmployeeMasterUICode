/**
 *
 * Menu
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import { makeSelectLoginResponse } from '../../containers/LoginForm/selectors';
import { onLogout } from '../../containers/LoginForm/actions';
import { onDashboardClear } from '../../containers/Dashboard/actions';
import { onEmployeeClear } from '../../containers/Employee/actions';
import { onUserClear } from '../../containers/LoginMaster/actions';

class Menu extends Component {
  constructor(props) {
    super(props);

  }

  onLogout = () => {
    this.props.onLogout();
    this.props.onDashboardClear();
    this.props.onEmployeeClear();
    this.props.onUserClear();
    setTimeout(function () {
      this.props.dispatch(push('/'));
    }.bind(this), 100);

  }

  render() {
    if (this.props.login_response) {
      return (
        <span>

          <Link to="/dashboard">
            Dashboard
                </Link>
          <Link to="/change-password">
            Change Password
                </Link>
          <a
            href="#"
            onClick={() => this.onLogout()}
          >
            Logout
    </a>

        </span>
      );
    }

    else {
      return <div />
    }
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login_response: makeSelectLoginResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLogout: () => {
      dispatch(onLogout());
    },
    onDashboardClear: () => {
      dispatch(onDashboardClear());
    },
    onEmployeeClear: () => {
      dispatch(onEmployeeClear());
    },
    onUserClear: () => {
      dispatch(onUserClear());
    },

  };
}

// const withSaga = injectSaga({ key: 'menu', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  // withSaga,
  withConnect,
)(Menu);
