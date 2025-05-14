import React from "react";
import { useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { userRegister } from "../../redux/apis/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoadingButton } from "../Loading";

function SignUp(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({
    name: "",
    //lastname: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [otherRole, seOtherRole] = useState("");
  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...credential };
    newInput[e.target.name] = e.target.value;

    setCredential(newInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credential.role == "other") credential.role = otherRole;

    await userRegister(credential, dispatch, navigate, props.onHide, setError);
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
                  <h2 style={{ marginTop: "0" }}>Sign Up</h2>
                </div>
              </div>
              <div className="col-md-12">
                <form id="contact" action="" method="post">
                  <div className="row">
                    <div className="col-md-12">
                      <fieldset>
                        <input
                          name="name"
                          value={credential.name}
                          onChange={getInput}
                          type="text"
                          className="form-control"
                          id="21name"
                          placeholder="Your Fullname"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset>
                        <input
                          name="phone"
                          value={credential.phone}
                          onChange={getInput}
                          type="text"
                          className="form-control"
                          id="text"
                          placeholder="Your Phone"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset>
                        <input
                          name="username"
                          value={credential.username}
                          onChange={getInput}
                          type="text"
                          className="form-control"
                          id="text"
                          placeholder="Your Username"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12">
                      <fieldset>
                        <input
                          name="email"
                          value={credential.email}
                          onChange={getInput}
                          type="text"
                          className="form-control"
                          id="text"
                          placeholder="Your Email"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12">
                      <fieldset>
                        <select
                          className="form-control"
                          name="role"
                          value={credential.role}
                          onChange={getInput}
                        >
                          <option disabled>Select Your Role</option>
                          <option value="student">Student</option>
                          <option value="scholar">Scholar</option>
                          <option value="instructor">Instructor</option>
                          <option value="other">Other</option>
                        </select>
                      </fieldset>
                    </div>
                    {credential.role == "other" && (
                      <div className="col-md-12">
                        <fieldset>
                          <input
                            name="otherRole"
                            value={otherRole}
                            onChange={(e) => seOtherRole(e.target.value)}
                            type="text"
                            className="form-control"
                            id="text"
                            placeholder="Define your role"
                            required=""
                          />
                        </fieldset>
                      </div>
                    )}
                    <div className="col-md-6">
                      <fieldset>
                        <input
                          name="password"
                          value={credential.password}
                          onChange={getInput}
                          type="password"
                          className="form-control"
                          id="passoword"
                          placeholder="Your Password"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset>
                        <input
                          name="confirmPassword"
                          value={credential.confirmPassword}
                          onChange={getInput}
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Confirm Password"
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
                          id="form-submit5"
                          className="button"
                        >
                          {pending ? <LoadingButton /> : <>Sign up</>}
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

export default SignUp;
