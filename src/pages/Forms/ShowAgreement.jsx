import { Modal, Table } from 'reactstrap';
import React, { useState } from 'react';
import firebase from 'firebase';
export const storage = firebase.storage();

const ShowAgreement = (props) => {
  const [modalFullScreen, setmodalFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(props.showModal || false);
  const [agreement, setAgreement] = useState(props.agreement || {});
  function tog_fullscreen() {
    setmodalFullScreen(!modalFullScreen);
    removeBodyCss();
  }
  const closeModal = () => {
    setShowModal(false);
    props.setShowModal(false);
  };
  function removeBodyCss() {
    document.body.classList.add('no_padding');
  }

  return (
    <Modal
      size="xl"
      isOpen={showModal}
      toggle={() => {
        tog_fullscreen();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
          Rental Agreement
        </h5>
        <button
          onClick={closeModal}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Table bordered hover className="react_table">
          <thead className="table-nowrap">
            <tr>
              <th>Property Name</th>
              <th>Account</th>
              <th>Rent</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Due Date</th>
              <th>Attachment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{agreement.property_name}</td>
              <td>{agreement.account}</td>
              <td>{agreement.rent}</td>
              <td>{agreement.start_date}</td>
              <td>{agreement.end_date}</td>
              <td>{agreement.due_date}</td>
              <td>
                <a
                  href={agreement.fileURL}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer"
                >
                  Click to view
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Modal>
  );
};
export default ShowAgreement;
