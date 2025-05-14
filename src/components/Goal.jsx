import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { aboutError, getAbout, setAboutStarted } from "../redux/aboutUsSlice";
import { getTeam, setTeamStarted, teamError } from "../redux/teamSclice";
import api from "../utils/api";
import Header from "./Layout/Header";

function Goal() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.team.team);
  const { teams } = response;
  const abouts = useSelector((state) => state.about.about.about);

  useEffect(() => {
    fetchAbout();
    fetchTeam();
  }, []);

  const fetchAbout = async () => {
    dispatch(setAboutStarted());

    try {
      const { data } = await api.get("/admin/about");
      dispatch(getAbout(data));
    } catch (error) {
      dispatch(aboutError(error.response.data.message));
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

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        <Container style={{ paddingTop: "0rem" }} fluid>
          <Row style={{ gap: "0rem" }} className="justify-content-center">
            <Col sm={12} md={12} lg={8} id="tabs">
              <h4>Our Goal</h4>

              <p className="about-text" style={{ textAlign: "justify" }}>
                {abouts.goal}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Goal;
