import { Col, Container, Form, Input, Modal, Row } from 'reactstrap';
import React, { useState } from 'react';
import { generateId } from '../../utils/helper';
import { addUnitToFirebase } from '../../firebase/properties';

const AddUnit = (props) => {
  const [modalFullScreen, setmodalFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(props.showModal || false);
  const [unit, setUnit] = useState({});
  const onChange = (e) => {
    setUnit({ ...unit, [e.target.name]: e.target.value });
  };
  function tog_fullscreen() {
    setmodalFullScreen(!modalFullScreen);
    removeBodyCss();
  }
  function addPropertyModal() {
    setShowModal(!showModal);
    removeBodyCss();
  }
  const closeModal = () => {
    setShowModal(false);
    props.setShowModal(false);
  };
  function removeBodyCss() {
    document.body.classList.add('no_padding');
  }
  const addUnit = async () => {
    let response = addUnitToFirebase(props.data.id, unit);
    if (response) {
      setUnit({});
      closeModal();
      props.setRefetch(!props.refetch);
    }
  };

  const propertyOptions = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
  ];
  return (
    <Modal
      size="sm"
      isOpen={showModal}
      toggle={() => {
        tog_fullscreen();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
          Add Unit
        </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <Container>
            <div className="mb-3">
              <Row>
                <Col className="col-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Unit Name:
                  </label>
                  <Input name="name" type="text" className="form-control" onChange={onChange} />
                </Col>
                <Col className="col-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Floor (G/1st/2nd/Null):
                  </label>
                  <Input name="floor" type="text" className="form-control" onChange={onChange} />
                </Col>
                <Col className="col-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Baths:
                  </label>
                  <Input name="baths" type="number" className="form-control" onChange={onChange} />
                </Col>

                <Col className="col-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Beds:
                  </label>
                  <Input name="beds" type="number" className="form-control" onChange={onChange} />
                </Col>

                <Col className="col-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Size (unit: Sq. ft):
                  </label>
                  <Input name="size" type="text" className="form-control" onChange={onChange} />
                </Col>
              </Row>

              <Col>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button onClick={(e) => addUnit()} type="button" className="btn btn-primary">
                    Add Unit
                  </button>
                </div>
              </Col>

              {/* start */}
            </div>
          </Container>
        </Form>
      </div>
    </Modal>
  );
};
export default AddUnit;
