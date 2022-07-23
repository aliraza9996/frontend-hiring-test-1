import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  Row,
  Spinner,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { editPropertyInFirebase } from '../../firebase/properties';
import Select from 'react-select';
import { addLeaseToFirebase, editLeaseInFirebase } from '../../firebase/rent_rolls';
import { fetchData as fetchProperties } from '../../firebase/properties';
import firebase from 'firebase';
import moment from 'moment';
export const storage = firebase.storage();

const AddLease = (props) => {
  const [modalFullScreen, setmodalFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(props.showModal || false);
  const [lease, setLease] = useState(props.data || {});
  const properties = [{ value: 'Ali', label: 'Ali' }];
  const [property, setProperty] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    if (e.target.files[0]) setFile(e.target.files[0]);
  }

  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const path = `/rental-agreements/${file.name}`;
    const ref = storage.ref(path);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    setURL(url);
    setLease({ ...lease, fileURL: url });
    setLoading(false);
    setFile(null);
  };
  // Fetch properties to display the propery for which you want to add the lease
  useEffect(async () => {
    setProperty([]);
    let data = await fetchProperties();
    data.map((item) => {
      if (item.id && item.name) {
        const newProperty = [...property, { value: item.id, label: item.name }];
        setProperty(newProperty);
      }
    });
  }, []);

  // On change for the react select
  const onChange = (value, action) => {
    if (action.name === 'property') {
      setLease({ ...lease, property_name: value.label, [action.name]: value.value });
    } else {
      setLease({ ...lease, [action.name]: value.value });
    }
  };

  // on change for input components
  const onInputChange = (e) => {
    console.log(lease);
    setLease({ ...lease, [e.target.name]: e.target.value });
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
    setLease({});
    setShowModal(false);
    props.setShowModal(false);
  };
  function removeBodyCss() {
    document.body.classList.add('no_padding');
  }

  // Add lease function, first it calls the helper function addLeaseToFirebase
  const addLease = () => {
    const add = addLeaseToFirebase(lease);
    if (add) {
      setLease({});
      closeModal();
      props.setRefetch(!props.refetch);
    }
  };
  const editLease = () => {
    const edit = editLeaseInFirebase(lease.id, lease);
    if (edit) {
      setLease({});
      closeModal();
      props.setRefetch(!props.refetch);
    }
  };
  const propertyOptions = [
    { label: 'Residential', value: 'Residential' },
    { label: 'Commercial', value: 'Commercial' },
  ];
  const leaseType = [
    { label: 'Fixed', value: 'Fixed' },
    { label: 'Fixed w/rollover', value: 'Fixed w/rollover' },
    { label: 'At-will (month-to-month)', value: 'At-will (month-to-month)' },
  ];
  const cycleTypes = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Every two weeks', value: 'Every two weeks' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Every two months', value: 'Every two months' },
    { label: 'Every six months', value: 'Every six months' },
    { label: 'Yearly', value: 'Yearly' },
  ];

  const account = [
    { label: 'Income Accounts' },
    { label: 'Application fee Income', value: 'Application fee Income' },
    { label: 'Association Fee Income', value: 'Association Fee Income' },
    { label: 'Cleaning and Maiint Income', value: 'Cleaning and Maiint Income' },
    { label: 'Convenience Fee', value: 'Convenience Fee' },
    { label: 'Interest Income', value: 'Interest Income' },
    { label: 'Late Fee Income', value: 'Late Fee Income' },
    { label: 'Laundry Income', value: 'Laundry Income' },
    { label: 'NSF Fee Income', value: 'NSF Fee Income' },
    { label: 'Other Income', value: 'Other Income' },
    { label: 'Owner Contribution Convenience Fee', value: 'Owner Contribution Convenience Fee' },
    { label: 'Parking Income', value: 'Parking Income' },
    { label: 'Rent Income', value: 'Rent Income' },
    { label: 'Renters Insurance Income', value: 'Renters Insurance Income' },
    { label: 'Repairs Income', value: 'Repairs Income' },
    { label: 'Utility Income', value: 'Utility Income' },
    { label: 'Add new', value: 'Add new' },
  ];

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
          Add New Rental Agreement
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
          <Container fluid>
            {/*<Row className="signature_ststus">*/}
            {/*<Col lg="6">*/}
            {/*<Label className="form-label" htmlFor="formrow-firstname-input">*/}
            {/*  Signature Status*/}
            {/*</Label>*/}
            {/*<br />*/}
            {/*<ButtonGroup aria-label="Basic example">*/}
            {/*  <Button color="prima<ry" onClick={(e) => e.preventDefault()}>*/}
            {/*    Signed*/}
            {/*  </Button>*/}
            {/*  <Button color="primary" onClick={(e) => e.preventDefault()}>*/}
            {/*    Unsigned*/}
            {/*  </Button>*/}
            {/*</ButtonGroup>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            {/*<br />*/}
            <Row>
              <Col lg={3} md={6} sm={12}>
                <Label className="form-label" htmlFor="formrow-firstname-input">
                  Lease Details Property (Required)
                </Label>
                <Select
                  placeholder="Select Property"
                  value={props.data ? { label: lease.property_name } : null}
                  name="property"
                  options={property}
                  onChange={onChange}
                />
                {/*<Select*/}
                {/*  placeholder="Select Property"*/}
                {/*  value={props.data ? { label: lease.property_name } : null}*/}
                {/*  name="property"*/}
                {/*  options={property}*/}
                {/*  onChange={onChange}*/}
                {/*/>*/}
                <br />
              </Col>
            </Row>
            <Row className="lease_type">
              <Col sm={4} lg={3} md={3}>
                <label>LEASE TYPE</label>
                <Select
                  name="type"
                  options={leaseType}
                  onChange={onChange}
                  value={props.data ? { label: lease.type, value: lease.type } : null}
                />
              </Col>
              <Col sm={4} lg={3} md={3}>
                <label>START DATE</label>
                <Input
                  type="date"
                  name="start_date"
                  className="form-control"
                  onChange={onInputChange}
                  value={lease.start_date || ''}
                />
              </Col>
              <Col sm={4} lg={3} md={3}>
                <label>End Date</label>
                <Input
                  type="date"
                  className="form-control"
                  name="end_date"
                  onChange={onInputChange}
                  value={lease.end_date || ''}
                />
                <br />
              </Col>
            </Row>
            <Row>
              <Label className="form-label" htmlFor="formrow-firstname-input">
                Tenants and cosigners
              </Label>
              <br />
            </Row>
            <br />
            <Row className="leassedetail">
              <Col sm={12} lg={3} md={6}>
                <Label className="form-label" htmlFor="formrow-firstname-input">
                  Rent (option)
                </Label>
                <label>RENT CYCLE</label>
                <Select
                  name="cycle"
                  options={cycleTypes}
                  onChange={onChange}
                  value={props.data ? { label: lease.cycle, value: lease.cycle } : null}
                />
                <br />
              </Col>
            </Row>
            <Row className="lease_type">
              <Col sm={4} lg={3} md={3}>
                <label>Rent Amount</label>
                <Input
                  type="text"
                  name="rent"
                  value={lease.rent || ''}
                  className="form-control"
                  placeholder="100"
                  onChange={onInputChange}
                />
              </Col>
              {/*<Col sm={4} lg={3} md={3}>*/}
              {/*  <label>ACCOUNT</label>*/}
              {/*  <Select*/}
              {/*    name="account"*/}
              {/*    options={account}*/}
              {/*    onChange={onChange}*/}
              {/*    value={props.data ? { label: lease.account, value: lease.account } : null}*/}
              {/*  />*/}
              {/*</Col>*/}
              <Col sm={4} lg={3} md={3}>
                <label>NEXT DUE DATE</label>
                <Input
                  type="text"
                  name="next_due_date"
                  className="form-control"
                  id="prop_city"
                  onChange={onInputChange}
                  disabled
                  value={
                    lease.cycle === 'Monthly'
                      ? moment(lease.start_date, 'YYYY-MM-DD').add(1, 'M').format('MM/DD/YYYY')
                      : lease.start_date
                  }
                />
                <br />
              </Col>
            </Row>

            <Row className="leassedetail">
              <Col sm={12} lg={6} md={6}>
                <label>MEMO</label>
                <Input
                  type="text"
                  name="memo"
                  className="form-control"
                  placeholder="If left blank, will show 'Rent' "
                  value={lease.memo || ''}
                  onChange={onInputChange}
                />
                <br />
              </Col>
            </Row>
            <Row>
              <Col sm={4} lg={3} md={3}>
                <Label className="form-label" htmlFor="formrow-firstname-input">
                  Security deposits (optional)
                </Label>
                <br />
              </Col>
            </Row>
            <Row className="lease_type">
              <Col sm={4} lg={3} md={3}>
                <label>DUE DATE</label>
                <Input
                  type="date"
                  name="due_date"
                  value={lease.due_date || ''}
                  className="form-control"
                  onChange={onInputChange}
                />
              </Col>
              <Col sm={4} lg={3} md={3}>
                <label>AMOUNT</label>
                <Input
                  type="text"
                  name="amount"
                  value={lease.amount || ''}
                  className="form-control"
                  placeholder="100"
                  onChange={onInputChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Label className="form-label" htmlFor="formrow-firstname-input">
                  Charges (optional)
                </Label>
                <br />
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <Label className="form-label" htmlFor="formrow-firstname-input">
                  Upload Files
                </Label>
                <br />
                <div className="file-upload-wrapper mb-2">
                  <Row>
                    <Col lg={5}>
                      <Input
                        type="file"
                        name="file"
                        className="file-upload"
                        onChange={handleFileChange}
                      />
                    </Col>
                    <Col lg={2}>
                      <Button size="sm" color="primary" onClick={handleUpload} disabled={!file}>
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Loading...</span>
                          </>
                        ) : (
                          'Upload'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </div>
                {lease && lease.fileURL ? (
                  <a target="_blank" rel="noreferrer" href={url}>
                    Open in new tab
                  </a>
                ) : null}
                {url ? (
                  <a target="_blank" rel="noreferrer" href={url}>
                    Open in new tab
                  </a>
                ) : null}
              </Col>
            </Row>
            <Col>
              <div className="modal-footer">
                {props.data ? (
                  <Button
                    onClick={(e) => editLease(e)}
                    color="success"
                    className="waves-effect waves-light"
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => addLease(e)}
                    color="success"
                    className="waves-effect waves-light"
                  >
                    Add Lease
                  </Button>
                )}

                <Button color="light" className="waves-effect waves-light" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Container>
        </Form>
      </div>
    </Modal>
  );
};
export default AddLease;
