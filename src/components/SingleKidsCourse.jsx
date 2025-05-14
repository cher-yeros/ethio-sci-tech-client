import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryByKids } from "../redux/apis/manage-course";
import Header from "./Layout/Header";
import Loading from "./Loading";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";

function SingleKidsCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const courses = useSelector((state) => state.course.courseBySubject);
  const { pending } = useSelector((state) => state.course);
  const [openPlayer, setopenPlayer] = useState(false);

  const [currentRecord, setcurrentRecord] = useState({});

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const fetchCourses = async () => {
    await getCategoryByKids(dispatch, category);
  };

  const handlePlay = async (course) => {
    setcurrentRecord(course);
    setopenPlayer(course);
  };

  const n = async (type) => {
    navigate("/kids-course/" + type);
  };
  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        <Container style={{ paddingTop: "2rem" }} fluid>
          <div
            className="d-none d-md-flex d-lg-flex  justify-content-center align-items-center my-2"
            style={{ gap: "1rem" }}
          >
            <MuiButton
              onClick={(e) => n("science-animation")}
              variant="contained"
            >
              Science animation
            </MuiButton>
            <MuiButton onClick={(e) => n("entertainement")} variant="contained">
              Entertainement
            </MuiButton>
          </div>
          <div
            className=" d-sm-flex d-md-none d-flex flex-column  justify-content-center align-items-center my-2"
            style={{ gap: "1rem" }}
          >
            <MuiButton
              sx={{ width: "11rem" }}
              onClick={(e) => n("science-animation")}
              variant="contained"
            >
              Science animation
            </MuiButton>
            <MuiButton
              sx={{ width: "11rem" }}
              onClick={(e) => n("entertainement")}
              variant="contained"
            >
              Entertainement
            </MuiButton>
          </div>
          {pending ? (
            <Loading />
          ) : (
            <>
              <section className="contact" style={{ paddingBottom: "0" }}>
                <Row>
                  <Col lg={12}>
                    {/*<form
                      id="contact"
                      style={{ padding: "1rem", paddingTop: "2rem" }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <fieldset>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search course here..."
                                aria-label="Search course here"
                                aria-describedby="button-addon2"
                              />
                              <button
                                className="btn btn-outline-secondary px-3"
                                type="button"
                                id="button-addon2"
                                style={{
                                  borderRadius: "0",
                                  height: "2.5rem",
                                  fontSize: "1.2rem",
                                  padding: "0",
                                }}
                              >
                                <Icon.Search />
                              </button>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </form>*/}
                  </Col>
                </Row>
              </section>
              <Row className="mt-4" style={{ rowGap: "1rem" }}>
                {courses.map((course) => (
                  <Col key={course.id} sm={6} md={4} lg={6}>
                    <div className="item card">
                      <Row>
                        <Col lg={5}>
                          <img
                            src={`https://img.youtube.com/vi/${course?.youtubeLink?.substr(
                              course?.youtubeLink?.indexOf("?v=") + 3,
                              course?.youtubeLink?.length - 1
                            )}/hqdefault.jpg`}
                            alt="Course #2"
                          />
                        </Col>
                        <Col lg={7}>
                          <div
                            className="down-content"
                            style={{ background: "transparent" }}
                          >
                            <h4>{course.title}</h4>
                            <h6>
                              Category : <strong>{category}</strong>
                            </h6>

                            <Button
                              onClick={() => handlePlay(course)}
                              className="btn-sm"
                            >
                              Watch now
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </section>
      <VideoPlayer
        record={currentRecord}
        show={openPlayer}
        onHide={() => setopenPlayer(false)}
      />
    </>
  );
}

export default SingleKidsCourse;
