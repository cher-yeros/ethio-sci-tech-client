import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllApparatuss } from "../redux/apis/manage-apparatus";
import { addOrder } from "../redux/apis/manage-orders";
import { apiUrl } from "../utils/api";
import ReadMore from "../utils/ReadMore";
import Header from "./Layout/Header";
import Loading from "./Loading";

function Equipment() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.apparatus.apparatus);
  const { loggedIn, currentUser } = useSelector((state) => state.user);
  const { apparatuses } = response;
  const { pending } = useSelector((state) => state.apparatus);
  const [ordering, setShowOrdering] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllApparatuss(dispatch, currentPage, query);
  };

  const orderApparatus = async (apparatus) => {
    //console.log(!loggedIn);
    if (!loggedIn) {
      alert("You must be logged in to order apparatus!");
    } else {
      setShowOrdering(true);
      const cred = {
        ApparatuId: apparatus.id,
        UserId: currentUser.user?.id,
        quantity: 0,
      };

      //console.log(cred);
      await addOrder(dispatch, cred);
      setShowOrdering(false);
    }
  };

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        {pending ? (
          <Loading />
        ) : (
          <Container style={{ paddingTop: "1rem" }} fluid>
            <Row style={{ rowGap: "1rem" }}>
              <Row>
                <Col lg={12}>
                  <div className="col-md-12">
                    <div
                      className="section-heading mb-3"
                      style={{ marginBottom: "0" }}
                    >
                      <h2 style={{ marginTop: "0" }}>Equipements</h2>
                    </div>
                  </div>
                  <Row>
                    {apparatuses.map(
                      (apparatus) =>
                        apparatus.type === "equipment" && (
                          <Col key={apparatus.id} sm={6} md={4} lg={3}>
                            <div key={apparatus.id} className="item card">
                              <img
                                src={`${apiUrl}/static/apparatus/${apparatus.photo}`}
                                alt="Course #2"
                              />
                              <div
                                className="down-content"
                                style={{ padding: "1rem" }}
                              >
                                <h4>{apparatus.name}</h4>
                                <p style={{ marginBottom: "5px" }}>
                                  <strong>Price : </strong>
                                  <h6 style={{ display: "inline" }}>
                                    {apparatus.price} ETB
                                  </h6>
                                </p>
                                <p style={{ marginBottom: "5px" }}>
                                  <strong>Stock : </strong>
                                  <h6 style={{ display: "inline" }}>
                                    {apparatus.quantity} piece
                                  </h6>
                                </p>
                                <p>
                                  <ReadMore
                                    text={apparatus.description}
                                    length={70}
                                    title={<strong>description</strong>}
                                  />
                                </p>
                                <Button
                                  onClick={() => orderApparatus(apparatus)}
                                  className="btn-sm"
                                >
                                  Order now
                                </Button>
                              </div>
                            </div>
                          </Col>
                        )
                    )}
                  </Row>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
      </section>
      <Downloading show={ordering} onHide={() => setShowOrdering(false)} />
    </>
  );
}

export default Equipment;

function Downloading(props) {
  const { record } = props;
  return (
    <Modal
      {...props}
      backdrop="static"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Body style={{ padding: ".3rem" }} className="my-3">
        <div className="d-flex justify-content-center ">
          <Spinner
            style={{
              top: "0",
              left: "0%",
            }}
            animation="border"
            variant="primary"
          />
        </div>

        <div className="mt-4" style={{ textAlign: "center" }}>
          Ordering...
        </div>
      </Modal.Body>
    </Modal>
  );
}
