import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  Row,
  Spinner,
  Tooltip,
} from 'reactstrap';
import React, { useState } from 'react';
import {
  addPropertyToFirebase,
  addUnitToFirebase,
  editPropertyInFirebase,
} from '../../firebase/properties';
import { AiOutlineInfoCircle } from 'react-icons/all';
import Select from 'react-select';
import { forEach } from 'lodash';
import AddUnitsInProperty from './AddUnitsInProperty';

const AddProperty = (props) => {
  const [modalSmall, setModalSmall] = useState(false);
  const [modalFullScreen, setmodalFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(props.showModal || false);
  const [property, setProperty] = useState(props.data || {});
  const [unit, setUnit] = useState(1);
  const [unitsData, setUnitsData] = useState([]);
  const [tooltip, setTooltip] = useState({ address: false, city: false });
  const [loading, setLoading] = useState(false);
  const toggleTooltip = (key) => {
    setTooltip({ ...tooltip, [key]: !tooltip[key] });
  };
  const onChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };
  const onSelectChange = (value, action) => {
    console.log(value.name, action.value);
    setProperty({ ...property, [action.name]: value.value });
  };
  function tog_fullscreen() {
    setmodalFullScreen(!modalFullScreen);
    removeBodyCss();
  }
  function tog_loading() {
    setLoading(!loading);
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
  const addProperty = async () => {
    setLoading(true);
    const add = await addPropertyToFirebase(property);
    if (add) {
      if (unitsData) {
        unitsData.map(async (item) => {
          console.log(item);
          const asyncUnitRes = await addUnitToFirebase(add.id, item);
          console.log(asyncUnitRes);
        });
      }
      setProperty({});
      setUnit({});
      closeModal();
      setLoading(!loading);
      props.setRefetch(!props.refetch);
    }
  };

  const editProperty = () => {
    const edit = editPropertyInFirebase(property.id, property);
    if (edit) {
      setProperty({});
      closeModal();
      props.setRefetch(!props.refetch);
    }
  };
  const propertyOptions = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
  ];
  const OwnerName = [
    { label: 'Ali', value: 'Ali' },
    { label: 'Raza', value: 'Raza' },
  ];
  const ManagerName = [
    { label: 'Ali', value: 'Ali' },
    { label: 'Raza', value: 'Raza' },
  ];
  return (
    <>
      <Modal
        size="lg"
        isOpen={loading}
        toggle={() => {
          tog_loading();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
            Please wait
          </h5>
          <button
            onClick={() => setLoading(!loading)}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body text-center">
          <Spinner type="grow" color="success" />
        </div>
      </Modal>
      <Modal
        size="xl"
        isOpen={showModal}
        toggle={() => {
          tog_fullscreen();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
            Add Asset
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
          <Form>
            <Container>
              <Label className="form-label" htmlFor="formrow-firstname-input">
                Asset Type
              </Label>
              <Select options={propertyOptions} name="asset_type" onChange={onSelectChange} />

              <div className="mb-3">
                <Row>
                  <Col className="col-6">
                    <label htmlFor="message-text" className="col-form-label">
                      Asset Name:
                    </label>{' '}
                    <Input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={onChange}
                      value={property.name}
                    />
                  </Col>
                  <Col className="col-lg-6">
                    <label htmlFor="message-text" className="col-form-label">
                      Units
                    </label>
                    <Input
                      name="units"
                      type="number"
                      min={1}
                      defaultValue={1}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12">
                    <label htmlFor="message-text" className="col-form-label">
                      Address:
                    </label>
                    <AiOutlineInfoCircle id="addressTooltip" />
                    <Tooltip
                      placement="right"
                      target="addressTooltip"
                      isOpen={tooltip.address}
                      toggle={() => toggleTooltip('address')}
                    >
                      Please input the address of your property
                    </Tooltip>
                    <Input
                      type="text"
                      name="address"
                      className="form-control"
                      id="prop_address"
                      onChange={onChange}
                      value={property.address}
                    />
                  </Col>
                  <Col className="col-3">
                    <label htmlFor="message-text" className="col-form-label">
                      City:
                    </label>{' '}
                    <AiOutlineInfoCircle id="city" />
                    <Tooltip
                      placement="right"
                      target="city"
                      isOpen={tooltip.city}
                      toggle={() => toggleTooltip('city')}
                    >
                      Please enter the city
                    </Tooltip>
                    <Input
                      name="city"
                      type="text"
                      className="form-control"
                      id="prop_city"
                      onChange={onChange}
                      value={property.city}
                    />
                  </Col>

                  <Col className="col-3">
                    <label htmlFor="message-text" className="col-form-label">
                      State:
                    </label>
                    <Input
                      name="state"
                      type="text"
                      className="form-control"
                      onChange={onChange}
                      value={property.state}
                    />
                  </Col>

                  <Col className="col-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Zip:
                    </label>
                    <Input
                      name="zip"
                      type="text"
                      className="form-control"
                      onChange={onChange}
                      value={property.zip}
                    />
                  </Col>
                  <Col className="col-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Country:
                    </label>
                    <Input
                      name="country"
                      type="text"
                      className="form-control"
                      value={property.country}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <label htmlFor="message-text" className="col-form-label">
                      Owner Name:
                    </label>
                    <Select options={OwnerName} name="owner" onChange={onSelectChange} />

                    {/*<Input*/}
                    {/*  name="owner"*/}
                    {/*  type="text"*/}
                    {/*  className="form-control"*/}
                    {/*  value={property.owner}*/}
                    {/*  onChange={onChange}*/}
                    {/*/>*/}
                  </Col>

                  <Col className="col-4">
                    <label htmlFor="message-text" className="col-form-label">
                      Manager(Optional):
                    </label>
                    <Select options={ManagerName} name="manager" onChange={onSelectChange} />

                    {/*<Input*/}
                    {/*  name="manager"*/}
                    {/*  type="text"*/}
                    {/*  className="form-control"*/}
                    {/*  value={property.manager}*/}
                    {/*  onChange={onChange}*/}
                    {/*/>*/}
                  </Col>
                  <Col className="col-4">
                    <label htmlFor="message-text" className="col-form-label">
                      Asset Size: (in sq feet)
                    </label>
                    <Input
                      name="size"
                      type="text"
                      className="form-control"
                      value={property.size}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <AddUnitsInProperty totalUnits={unit} units={unitsData} setUnits={setUnitsData} />
                {/* <Col className="col-12">
                <Row>
                  <Col className="col-12">
                    <label htmlFor="message-text" className="col-form-label">
                      Property Reserve:
                    </label>
                    <Input
                      name="property_reserve"
                      type="text"
                      className="form-control"
                      value={property.property_reserve}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </Col> */}

                <Col>
                  <div className="modal-footer">
                    <Button
                      color="danger"
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    {/*{console.log(Object.keys(props.data).length)}*/}
                    {props.data && Object.keys(props.data).length === 0 ? (
                      <Button color="primary" onClick={(e) => addProperty()} type="button">
                        Add Property
                      </Button>
                    ) : (
                      <Button color="primary" onClick={(e) => editProperty()} type="button">
                        Save Changes
                      </Button>
                    )}
                  </div>
                </Col>

                {/* start */}
              </div>
            </Container>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default AddProperty;
