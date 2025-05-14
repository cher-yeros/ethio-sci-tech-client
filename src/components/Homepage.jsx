import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllSubject,
  getSubjectByCategory,
} from "../redux/apis/manage-subject";
import Courosel from "./Courosel";
import Gallary from "./Gallary";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Projects from "./Projects";
import SingleTestimony from "./SingleTestimony";

function Homepage() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.subject.subjectCategory);
  const subjects = useSelector((state) => state.subject.subject.subjects);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    await getAllSubject(dispatch);
    await getSubjectByCategory(dispatch);
  };

  return (
    <>
      <Header />
      <section style={{ marginTop: "1rem", height: "calc(100vh - 5rem)" }}>
        <Container style={{ padding: "0rem" }} fluid>
          <Courosel />
          <Projects />

          {subjects.length > 0 && (
            <Container className="img-bg img-courses pt-4" fluid>
              <Row
                className="justify-content-md-center"
                style={{ rowGap: "1rem", columnGap: "1rem" }}
              >
                <div className="col-md-12">
                  <div
                    className="section-heading hp-courses"
                    style={{ marginBottom: "0" }}
                  >
                    <h2 style={{ marginTop: "0" }}>Courses</h2>
                  </div>
                </div>
                <section id="pricing" class="pricing">
                  <div class="container" data-aos="fade-up">
                    {/* <div class="section-title">
                      <p>
                        Magnam dolores commodi suscipit. Necessitatibus eius
                        consequatur ex aliquid fuga eum quidem. Sit sint
                        consectetur velit. Quisquam quos quisquam cupiditate. Et
                        nemo qui impedit suscipit alias ea. Quia fugiat sit in
                        iste officiis commodi quidem hic quas.
                      </p>
                    </div> */}
                    <div class="row" style={{ rowGap: "1rem" }}>
                      {Object.keys(category).map(
                        (item, i) =>
                          category[item].length > 0 && (
                            <div
                              class="col-lg-3 col-md-6"
                              data-aos="fade-up"
                              data-aos-delay="100"
                            >
                              <div class="box featured">
                                <h3>{item.replaceAll("_", " ")}</h3>

                                <ul>
                                  {category[item].map((sub) => (
                                    <li>
                                      <Link
                                        to={`/course/${sub.title}`}
                                        className="py-3 text-dark"
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {sub.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                {/* <div class="btn-wrap">
                              <a href="#" class="btn-buy">
                                Show all
                              </a>
                            </div> */}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </section>
              </Row>
            </Container>
          )}

          <Gallary />

          <SingleTestimony />
          <Footer />
        </Container>
      </section>
    </>
  );
}

export default Homepage;
