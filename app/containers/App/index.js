/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FeaturePage from 'containers/FeaturePage/Loadable';
import Employee from 'containers/Employee/Loadable';
import EmployeeForm from 'containers/EmployeeForm/Loadable';
import Dashboard from 'containers/Dashboard/index';
import LoginForm from 'containers/LoginForm/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegistrationForm from 'containers/RegistrationForm/Loadable';
import LoginMaster from 'containers/LoginMaster/Loadable';
import ILCMaster from 'containers/ILCMaster/Loadable';
import ILCImport from 'containers/ILCImport/Loadable';
import FinancialReport from 'containers/FinancialReport/Loadable';
import ILCForm from 'containers/ILCMaster/ILCForm';
import ChangePassword from 'containers/ChangePassword/Loadable';
import RoleType from 'containers/RoleType/Loadable';
import '../../css/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import Menu from 'components/Menu/Menu';
import Sidebar from 'components/Menu/sidebar';
import SidebarContent from 'components/Menu/sidebar_content';
import AuditLog from 'containers/AuditLog/Loadable';
import LandedResourceForm from 'containers/LandedResourceForm/Loadable';
import LandedResourceList from 'containers/LandedResourceList/Loadable';
//import DropdownButton from 'react-bootstrap/DropdownButton'
//import Dropdown from 'react-bootstrap/Dropdown'
import {
  makeSelectLoggedInUserName,
  makeSelectLoginResponse,
} from '../LoginForm/selectors';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      // transitions: true,
      // touch: true,
      // shadow: true,
      // pullRight: false,
      // touchHandleWidth: 10,
      // dragToggleDistance: 30,
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      //if (location.pathname == '/') {
      this.setState({ open: false });
      //}
    });
  }
  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  render() {
    const { pathname } = this.props.location;

    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span className="menu-icon-left">
        {!this.state.docked && (
          <a onClick={this.menuButtonClick} href="#">
            ☰
          </a>
        )}
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName:
        'col-xl-2 col-lg-4 col-md-4 col-sm-12 custom-sidebar-class',
      contentId: 'custom-sidebar-content-id',
      open: this.state.open,
      // touch: this.state.touch,
      // shadow: this.state.shadow,
      // pullRight: this.state.pullRight,
      // touchHandleWidth: this.state.touchHandleWidth,
      // dragToggleDistance: this.state.dragToggleDistance,
      // transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    //<DropdownButton className="nav-link" id="dropdown-item-button" title="Profile">
    //  <Dropdown.Item as="button">Profile</Dropdown.Item>
    //  <Dropdown.Item as="button">Change Password</Dropdown.Item>
    //  <Dropdown.Item as="button">Logout</Dropdown.Item>
    //</DropdownButton>

    return (
      <div className="">
        <div className="header header-top-space container-fluid">
          {/* <div className="clearfix">
                <img className="img1" alt="" />
                <img className="img2" alt="" />
                <h3 className="header-color">EaseFuture App</h3>
              </div> */}
          <div className="row">
            <div className="col-md-3">
              <h3 className="header-color">EaseFuture App</h3>
            </div>
            <div className="col-md-6 logo-center">
              {this.props.loggedInUserName && this.props.loggedInResponse && (
                <div className="username-text">
                  Welcome {this.props.loggedInUserName.username}
                </div>
              )}
            </div>
            <div className="col-md-3">
              <img className="img1" alt="" />
              <img className="img2" alt="" />
            </div>
          </div>
        </div>

        <Sidebar {...sidebarProps}>
          {pathname !== '/' && contentHeader}
          <div>
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/features" component={FeaturePage} />
              <Route exact path="/employee" component={Employee} />
              <Route exact path="/employee-form" component={EmployeeForm} />
              <Route exact path="/registration" component={RegistrationForm} />
              <Route exact path="/change-password" component={ChangePassword} />
              <Route exact path="/login-master" component={LoginMaster} />
              <Route exact path="/ilc-master" component={ILCMaster} />
              <Route exact path="/ilc-import" component={ILCImport} />
              <Route exact path="/ilc-form" component={ILCForm} />
              <Route exact path="/role-type" component={RoleType} />
              <Route exact path="/audit-log" component={AuditLog} />
              <Route exact path="/audit-log" component={AuditLog} />
              <Route exact path="/landed-resource-form" component={LandedResourceForm} />
              <Route exact path="/landed-resource-list" component={LandedResourceList} />
              <Route
                exact
                path="/financial-report"
                component={FinancialReport}
              />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch, props) {
  return {
    // onChangeDealerCode: evt => dispatch(changeDealerCode(evt.target.value)),
  };
}

const mapStateToProps = createStructuredSelector({
  //  registrations: makeSelectRegistrations(),
  loggedInUserName: makeSelectLoggedInUserName(),
  loggedInResponse: makeSelectLoginResponse(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(App));
