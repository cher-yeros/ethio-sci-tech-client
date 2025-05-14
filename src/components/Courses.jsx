import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectByCategory } from "../redux/apis/manage-subject";
import Header from "./Layout/Header";
import SubjectList from "./SubjectList";
import Loading from "./Loading";
function Courses() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.subject.subjectCategory);
  const { pending } = useSelector((state) => state.subject);
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    await getSubjectByCategory(dispatch);
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
            <section id="pricing" class="pricing">
              <div class="container" data-aos="fade-up">
                <div class="section-title">
                  <h2>Courses</h2>
                  {/* <p>
                    Magnam dolores commodi suscipit. Necessitatibus eius
                    consequatur ex aliquid fuga eum quidem. Sit sint consectetur
                    velit. Quisquam quos quisquam cupiditate. Et nemo qui
                    impedit suscipit alias ea. Quia fugiat sit in iste officiis
                    commodi quidem hic quas.
                  </p> */}
                </div>
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
          </Container>
        )}
      </section>
    </>
  );
}

export default Courses;
