import React from 'react';
import { Button } from 'reactstrap';

const Columns = (handleClick, handleEdit, deleteData) => [
  {
    dataField: 'direction',
    text: 'Direction',
    sort: true,
  },
  {
    dataField: 'from',
    text: 'From',
    sort: true,
  },

  {
    dataField: 'to',
    text: 'To',
    sort: true,
  },
  {
    dataField: 'duration',
    text: 'Duration',
    sort: true,
  },
  {
    dataField: 'is_archived',
    text: 'Archived',

    sort: true,
  },
  {
    dataField: 'call_type',
    text: 'Type',
    sort: true,
  },
  {
    dataField: 'via',
    text: 'Via',
    sort: true,
  },
  {
    dataField: 'created_at',
    text: 'Created At',
    sort: true,
  },
  // {
  //   dataField: 'notes',
  //   text: 'Notes',
  //   sort: true,
  // },

  {
    dataField: 'menu',
    isDummyField: true,
    text: 'Action',
    formatter: (cellContent, row) => (
      <>
        <Button color="primary" size="sm" onClick={() => handleClick(row)}>
          View
        </Button>{' '}
        {/*<Button color="warning" size="sm" onClick={() => handleEdit(row)}>*/}
        {/*  Edit*/}
        {/*</Button>{' '}*/}
        {/*{row.status === COMPANY_STATUS.APPROVED ? (*/}
        {/*  <Link to="#" className="px-3 text-danger">*/}
        {/*    <i className="uil uil-trash-alt font-size-14" alt="Reject" />*/}
        {/*    <br />*/}
        {/*    <a onClick={() => onApproveAction(row, onUpdate, COMPANY_STATUS.REJECTED)}>*/}
        {/*      Disapprove Now*/}
        {/*    </a>*/}
        {/*  </Link>*/}
        {/*) : (*/}
        {/*  <Link to="#" className="px-3 text-primary">*/}
        {/*    <i className="uil uil-check font-size-14" alt="Approve" />*/}
        {/*    <br />*/}
        {/*    <a onClick={() => onApproveAction(row, onUpdate, COMPANY_STATUS.APPROVED)}>*/}
        {/*      Approve Now*/}
        {/*    </a>*/}
        {/*  </Link>*/}
        {/*)}*/}
      </>
    ),
  },
];

export default Columns;
