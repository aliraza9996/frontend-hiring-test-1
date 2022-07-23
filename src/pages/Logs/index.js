import React, { useEffect, useState } from 'react';
import { Button, Container, CardBody, Card, Row, Col, Modal } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import Columns from './Columns';
import axios from 'axios';
const Logs = () => {
  const [data, setData] = useState([]);
  const [loginData, setLoginData] = useState(localStorage.getItem('user'));
  const [showModal, setShowModal] = useState(false);
  const [logs, setLogs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [tableRows, setTableRows] = useState(10);
  const [showDetails, setShowDetails] = useState(false);
  const [dataRow, setDataRow] = useState({});
  const { SearchBar, ClearSearchButton } = Search;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authUser')}` },
  };
  useEffect(() => {
    const refreshToken = () => {
      axios
        .post('https://frontend-test-api.aircall.io/auth/refresh-token', loginData, config)
        .then((response) => {
          localStorage.setItem('authUser', response.data.access_token);
        })
        .catch((error) => console.error(error));
    };
    setInterval(refreshToken, 600000);
  }, []);
  useEffect(async () => {
    axios
      .get('https://frontend-test-api.aircall.io/calls', config)
      .then((response) => {
        setData(response.data.nodes);
      })
      .catch((error) => console.error(error));
    setLogs(data);
  }, [refetch]);
  const pageOptions = {
    sizePerPage: tableRows,
    totalSize: 15, // replace later with size(customerList),
    custom: true,
    nextPageText: 'Next',
    prePageText: 'Previous',
  };
  function handleClick(row) {
    setShowDetails(!showDetails);
    setDataRow(row);
  }
  function handleEdit(row) {
    setShowModal(!showModal);
    setDataRow(row);
  }

  const onSizeChange = (e) => {
    setTableRows(e.target.value);
  };
  const handleTableChange = (type, { page, searchText }) => {
    setLogs(
      logs.filter((property) =>
        Object.keys(property).some((key) =>
          property[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  };

  return (
    <React.Fragment>
      {showDetails ? (
        <Modal
          size="md"
          isOpen={showDetails}
          toggle={() => {
            tog_loading();
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
              API Details
            </h5>
            <button
              onClick={() => setShowDetails(!showDetails)}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">
            <p>ID: {dataRow.id}</p>
            <p>Direction: {dataRow.direction}</p>
            <p>From: {dataRow.from}</p>
            <p>To: {dataRow.to}</p>
            <p>Duration: {dataRow.duration}</p>
            <p>Archived: {dataRow.is_archived ? 'Yes' : 'No'}</p>
            <p>Type: {dataRow.call_type}</p>
            <p>Via: {dataRow.via}</p>
            <p>Created at: {dataRow.created_at}</p>
            <p>
              Notes:
              <ul>
                {dataRow.notes &&
                  dataRow.notes.map((item, index) => {
                    return <li key={index}>{item.content}</li>;
                  })}
              </ul>
            </p>
          </div>
        </Modal>
      ) : null}

      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <PaginationProvider pagination={paginationFactory(pageOptions)}>
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={data || []}
                        columns={Columns(handleClick, handleEdit)}
                        bootstrap4
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <div>
                              <Row>
                                <Col sm="12" md="6" lg="5">
                                  <Label>
                                    Show{' '}
                                    <Input
                                      type="select"
                                      className="custom-select custom-select-sm form-control form-control-sm form-select form-select-sm d-inline-block"
                                      style={{ width: 'auto' }}
                                      onChange={onSizeChange}
                                    >
                                      <option value="10">10</option>
                                      <option value="25">25</option>
                                      <option value="50">50</option>
                                      <option value="100">100</option>
                                    </Input>
                                  </Label>
                                </Col>

                                <Col sm="12" md="6" lg="5" className="offset-1">
                                  <Label className="float-end">
                                    Search: <SearchBar {...toolkitProps.searchProps} />
                                    <ClearSearchButton {...toolkitProps.searchProps} />
                                  </Label>
                                </Col>
                              </Row>
                              <div className="table-responsive mb-4">
                                <BootstrapTable
                                  responsive
                                  bordered={false}
                                  striped={false}
                                  classes={
                                    'table table-centered datatable dt-responsive nowrap table-card-list'
                                  }
                                  keyField="customerId"
                                  headerWrapperClasses={'bg-transparent'}
                                  {...toolkitProps.baseProps}
                                  onTableChange={handleTableChange}
                                  {...paginationTableProps}
                                />

                                <div className="float-end">
                                  <PaginationListStandalone {...paginationProps} />
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Logs;
