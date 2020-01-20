import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DeletePersonConfirmation extends Component {
  state = {
    removing: false,
  };

  close = () => {
    this.setState({
      removing: false,
    });
    this.props.onHide();
  };

  confirm = () => {
    const { empdata } = this.props;
    this.setState({ removing: true });
    this.props.onDeleteConfirm(empdata);
  };

  render() {
    const { show, empdata } = this.props;
    const { removing } = this.state;

    return (
      <Modal show={show} onHide={this.close} size="md">
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>Delete Employee Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you seriously want to delete "
            <b>{empdata && empdata.emp_name}</b>"
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close} disabled={removing}>
            No
          </Button>
          <Button variant="danger" onClick={this.confirm} disabled={removing}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  null,
  {},
)(DeletePersonConfirmation);
