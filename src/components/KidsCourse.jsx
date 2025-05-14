import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubjectByCategory } from "../redux/apis/manage-subject";
import Header from "./Layout/Header";
import Loading from "./Loading";
import { Button as MuiButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function KidsCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.subject.subjectCategory);
  const { pending } = useSelector((state) => state.subject);
  useEffect(() => {
    //fetchSubjects();
  }, []);

  const n = async (type) => {
    navigate("/kids-course/" + type);
  };

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses img-bg"
        data-section="section4"
      >
        {pending ? (
          <Loading />
        ) : (
          <Container style={{ paddingTop: "1rem" }} fluid>
            <section style={{ marginTop: "2rem" }} className="pricing-table">
              <Container fluid>
                <div
                  className="d-flex justify-content"
                  style={{ columnGap: "1rem" }}
                >
                  <MuiButton
                    onClick={(e) => n("science-animation")}
                    variant="contained"
                  >
                    Science animation
                  </MuiButton>
                  <MuiButton
                    onClick={(e) => n("entertainement")}
                    variant="contained"
                  >
                    Entertainement
                  </MuiButton>
                </div>

                <Row className="j">
                  <Col md={3} lg={3} className="pricing-table">
                    <div className="item card">
                      <div className="down-content cdc">
                        <h4>Kids course</h4>

                        <ul style={{ listStyle: "inside" }}>
                          {/*{category[item].map((sub) => (*/}
                          <li className="py-2">
                            <Link
                              to={`/kids-course/entertainement`}
                              className="py-3 text-dark"
                              style={{ textTransform: "capitalize" }}
                            >
                              Entertainement
                            </Link>
                          </li>
                          <li className="py-2">
                            <Link
                              to={`/kids-course/science-animation`}
                              className="py-3 text-dark"
                              style={{ textTransform: "capitalize" }}
                            >
                              Science animation
                            </Link>
                          </li>

                          {/*))}*/}
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Container>
        )}
      </section>
    </>
  );
}

export default KidsCourses;
