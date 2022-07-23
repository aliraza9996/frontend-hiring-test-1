import { Col, Input, Row } from 'reactstrap';
import React, { useState } from 'react';

const AddUnitsInProperty = (props) => {
  const onChange = (e, i) => {
    console.log(props.units);
    let temp = [...props.units];
    temp[i] = { ...props.units[i], [e.target.name]: e.target.value };
    props.setUnits(temp);
  };
  return (
    <>
      {Array.apply(null, { length: props.totalUnits }).map((e, i) => {
        return (
          <>
            <Row>
              <Col className="col-3">
                <label htmlFor="message-text" className="col-form-label">
                  Unit Name:
                </label>
                <Input
                  placeholder="Bikter"
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={(ee) => onChange(ee, i)}
                />
              </Col>
              <Col className="col-2">
                <label htmlFor="message-text" className="col-form-label">
                  Floor:
                </label>
                <Input
                  placeholder=" G/1st/2nd/Null"
                  name="floor"
                  type="text"
                  className="form-control"
                  onChange={(ee) => onChange(ee, i)}
                />
              </Col>
              <Col className="col-2">
                <label htmlFor="message-text" className="col-form-label">
                  Baths:
                </label>
                <Input
                  placeholder="2"
                  name="baths"
                  type="number"
                  className="form-control"
                  onChange={(ee) => onChange(ee, i)}
                />
              </Col>
              <Col className="col-2">
                <label htmlFor="message-text" className="col-form-label">
                  Beds:
                </label>
                <Input
                  placeholder="2"
                  name="beds"
                  type="number"
                  className="form-control"
                  onChange={(ee) => onChange(ee, i)}
                />
              </Col>
              <Col className="col-2">
                <label htmlFor="message-text" className="col-form-label">
                  Size: (unit: sq. ft)
                </label>
                <Input
                  placeholder="400"
                  name="size"
                  type="text"
                  className="form-control"
                  onChange={(ee) => onChange(ee, i)}
                />
              </Col>
            </Row>
          </>
        );
      })}
    </>
  );
};
export default AddUnitsInProperty;
