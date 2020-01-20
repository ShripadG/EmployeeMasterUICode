/**
 *
 * StepWizard
 *
 */

import React from 'react';

import { withRouter } from 'react-router-dom';
import '../../css/StepWizard.css';
// import checkIcon from "../images/check.png";

class StepWizard extends React.Component {
  constructor(props) {
    super(props);
   this.setStepWizardActive = this.setStepWizardActive.bind(this);
   //this.onContinue = this.onContinue.bind(this);
    // this.state = {
    //   itemId: 3,
    // };
    //localStorage.setItem('currentPage', 1);
  }

  componentDidMount() {
    console.log(this.props.itemid,'itemid90')
   this.setStepWizardActive(this.props.itemid);
  }

   componentDidUpdate(prevProps) {
     if (prevProps.itemid !== this.props.itemid) {
      this.setStepWizardActive(this.props.itemid);
     }
   }

  setStepWizardActive(itemid) {
    console.log(itemid,'itemid000')
    // let pathname = this.props.location.pathname;
    // pathname = pathname.substr(1);
    // if (pathname === '' || pathname === null) {
    //   this.setState({
    //     itemId: 1,
    //   });
    //   this.props.onChangePage(1)
    // } else if (pathname === 'configuration') {
    //   this.setState({
    //     itemId: 2,
    //   });
    //   this.props.onChangePage(2)
    // } else if (pathname === 'eligibility') {
    //   this.setState({
    //     itemId: 3,
    //   });
    //   this.props.onChangePage(3)
    // } else if (pathname === 'about-you') {
    //   this.setState({
    //     itemId: 4,
    //   });
    //   this.props.onChangePage(4)
    // } else if (pathname === 'play-back') {
    //   this.setState({
    //     itemId: 5,
    //   });
    // } else if (pathname === 'success') {
    //   this.setState({
    //     itemId: 6,
    //   });
    //   this.props.onChangePage(5)
    // }
    // setTimeout(() => {
    //   //localStorage.setItem('currentPage', this.state.itemId);
    //   this.props.onChangePage(this.state.itemId)
    // }, 200);

    //console.log(pathname,this.state)
  }

  // onContinue(){
  //   this.props.onContinueClick('1')
  // }
  render() {
   
      return (
        <div className="step-wizard">

          <div className="ui grid tablet stackable steps-ui-wrapper">
            <div className={'step-ui ' + (this.props.itemid === 1 ? 'active' : '')} >
              {/* <Link to="/configuration"> */}
              <div className="content">
                <div className="title"><span className="step-number" >1</span><span>Add Basic Detail</span></div>
                <div className="description" />
              </div>
              {/* </Link> */}
            </div>
            <div className={'step-ui ' + (this.props.itemid === 2 ? 'active' : '')}>
              {/* <Link to="/eligibility"> */}
              <div className="content">
                <div className="title"><span className="step-number" >2</span><span>Add Profile</span></div>
                <div className="description" />
              </div>
              {/* </Link> */}
            </div>
            {/* <div className={'step-ui ' + (this.props.itemid === 3 ? 'active' : '')}>
              <div className="content">
                <div className="title"><span className="step-number" >3</span><span>Add Contact Detail</span></div>
                <div className="description" />
              </div>
            </div> */}

          </div>
        </div>

      );
  }
}

export default withRouter(StepWizard);
