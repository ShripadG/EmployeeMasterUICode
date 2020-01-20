import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class DeleteUserConfirmation extends Component {

  state = {
    removing: false,
  };

  close = () => {
    this.setState({
      removing: false,
    });
    this.props.onHide()
  };

  confirm = () => {
    const { userdata } = this.props;
    this.setState({ removing: true });
    this.props.onDeleteConfirm(userdata);
  };

  componentDidMount(){
    console.log(this.state.removing)
  }

  render() {
    const { show, userdata } = this.props;
    const { removing } = this.state;
    return (
      <Modal show={show} onHide={this.close} size="md">
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>
            Delete User Confirmation
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you seriously want to delete "<b>{userdata && userdata.Username}</b>"
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close} disabled={removing}>No</Button>
          <Button variant="danger" onClick={this.confirm} disabled={removing}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, {  })(DeleteUserConfirmation);
