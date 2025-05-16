import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { aboutError, getAbout, setAboutStarted } from "../redux/aboutUsSlice";
import {
  getInstructor,
  instructorError,
  setInstructorStarted,
} from "../redux/instructorsSlice";
import { getTeam, setTeamStarted, teamError } from "../redux/teamSclice";
import api, { apiUrl } from "../utils/api";
import Header from "./Layout/Header";
import Loading from "./Loading";

function Teams() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.instructor.instructor);
  const { instructors } = response;

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    dispatch(setInstructorStarted());

    try {
      const { data } = await api.get("/admin/instructor");
      dispatch(getInstructor(data));
    } catch (error) {
      dispatch(instructorError(error.response.data.message));
    }
  };

  const fetchTeam = async () => {
    dispatch(setTeamStarted());
    try {
      const { data } = await api.get("/admin/team");
      dispatch(getTeam(data));
    } catch (error) {
      dispatch(teamError(error?.response?.data?.message.split(",")));
    }
  };

  const { pending } = useSelector((state) => state.instructor);

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        <Container className="mt-5" fluid>
          {pending ? (
            <Loading />
          ) : (
            <Container style={{ paddingTop: "1rem" }} fluid>
              <section id="instructors" class="instructors section-bg">
                <div class="container" data-aos="fade-up">
                  <div class="row">
                    {instructors.map((instructor) => (
                      <div
                        key={instructor.id}
                        class="col-lg-6 mb-3"
                        data-aos="fade-up"
                        data-aos-delay="100"
                      >
                        <div class="member d-flex align-items-start">
                          <div class="pic">
                            <img
                              crossOrigin="anonymous"
                              src={`${apiUrl}/static/instructor/${instructor?.photo}`}
                              // src="images/team/team-1.jpg"
                              class="img-fluid"
                              alt=""
                            />
                          </div>
                          <div class="member-info">
                            <h4>{instructor.name}</h4>
                            <span>{instructor.jobTitle}</span>
                            <p>
                              {instructor.description}
                              {/* Lorem ipsum dolor sit
                              amet consectetur adipisicing elit. Quidem,
                              nostrum! */}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </Container>
          )}
        </Container>
      </section>
    </>
  );
}

export default Teams;
