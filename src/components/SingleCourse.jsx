import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Header from "./Layout/Header";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { getCourseBySubject } from "../redux/apis/manage-course";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

function SingleCourse() {
  const dispatch = useDispatch();
  const { subject } = useParams();
  const courses = useSelector((state) => state.course.courseBySubject);
  const { pending } = useSelector((state) => state.course);
  const [openPlayer, setopenPlayer] = useState(false);

  const [currentRecord, setcurrentRecord] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    await getCourseBySubject(dispatch, subject);
  };

  const handlePlay = async (course) => {
    setcurrentRecord(course);
    setopenPlayer(course);
  };

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        <Container style={{ paddingTop: "1rem" }} fluid>
          {pending ? (
            <Loading />
          ) : (
            <>
              <section className="contact" style={{ paddingBottom: "0" }}>
                <Row>
                  <Col lg={12}>
                    <form
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
                    </form>
                  </Col>
                </Row>
              </section>
              <Row style={{ rowGap: "1rem" }}>
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
                              Subject : <strong>{subject}</strong>
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

export default SingleCourse;
