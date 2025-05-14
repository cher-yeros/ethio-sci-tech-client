import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apis/auth";
import { LoadingButton } from "../Loading";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const getInput = (e) => {
    let newInput = { ...credential };
    newInput[e.target.name] = e.target.value;

    setCredential(newInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(credential, dispatch, navigate, props.onHide, setError);
  };
  const { pending } = useSelector((state) => state.user);

  return (
    <Modal
      {...props}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Body style={{ padding: ".3rem" }}>
        <section className="contact pb-5">
          <Container fluid>
            <Row>
              <div className="col-md-12 mt-2">
                <div className="section-heading" style={{ marginBottom: "0" }}>
                  <h2 style={{ marginTop: "0" }}>Login</h2>
                </div>
              </div>
              <div className="col-md-12">
                <form id="contact" action="" method="post">
                  <div className="row">
                    <div className="col-md-12">
                      <fieldset>
                        <input
                          name="email"
                          value={credential.email}
                          onChange={getInput}
                          type="text"
                          className="form-control"
                          id="name111"
                          placeholder="Your Username"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12">
                      <fieldset>
                        <input
                          name="password"
                          value={credential.password}
                          onChange={getInput}
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Your Password"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12 mb-1">
                      <ul>
                        {error?.map((e) => (
                          <li key={e}>
                            <Alert
                              style={{ padding: ".4rem", margin: ".2rem" }}
                              key={e}
                              variant="danger"
                            >
                              {e}
                            </Alert>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-12">
                      <fieldset style={{ display: "flex", gap: "1rem" }}>
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          id="form-submit2"
                          className="button"
                          disabled={pending}
                        >
                          {pending ? <LoadingButton /> : <>Login</>}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            props.onHide();
                          }}
                          className="button"
                        >
                          Close
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
              {/*<Col lg={8}></Col>*/}
            </Row>
          </Container>
        </section>
      </Modal.Body>
      {/*<Modal.Footer>
        <Button onClick={() => props.onHide()}>Close</Button>
      </Modal.Footer>*/}
    </Modal>
  );
}

export default Login;
