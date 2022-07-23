import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, CardBody, Card, Container, Form, Input, Label } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
const Login = () => {
  const [loginInput, setLoginInput] = useState({ username: 'ali@gmail.com', password: 'ali123' });
  const history = useHistory();
  const onChange = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('https://frontend-test-api.aircall.io/auth/login/', loginInput)
      .then((response) => {
        localStorage.setItem('user', loginInput);
        localStorage.setItem('authUser', response.data.access_token);
        history.push('/home');
      })
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back!</h5>
                    <p className="text-muted">Sign in to continue to Front-end Test!</p>
                  </div>
                  <div className="p-2 mt-4">
                    <Form className="form-horizontal">
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={onChange}
                          value={loginInput.username || ''}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="float-end">
                          <Link to="/forgot-password" className="text-muted">
                            Forgot password?
                          </Link>
                        </div>
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          onChange={onChange}
                          placeholder="Enter Password"
                          value={loginInput.password || ''}
                        />
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <ul className="list-inline">
                          <li className="list-inline-item" />
                        </ul>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()}
                  <i className="mdi mdi-heart text-danger" />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
