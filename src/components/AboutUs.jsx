import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { aboutError, getAbout, setAboutStarted } from "../redux/aboutUsSlice";
import { getTeam, setTeamStarted, teamError } from "../redux/teamSclice";
import api from "../utils/api";
import Header from "./Layout/Header";

function AboutUs() {
  const dispatch = useDispatch();
  const abouts = useSelector((state) => state.about.about.about);

  useEffect(() => {
    fetchAbout();
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
              <h4 style={{ marginBottom: "1rem" }}>About us</h4>
              <h4 style={{ marginTop: "0" }}>
                Ethio-SciTech Engineering Group plc.
              </h4>

              <p className="about-text" style={{ textAlign: "justify" }}>
                {abouts.about}
              </p>
            </Col>
            <Col sm={12} md={12} lg={8} id="tabs">
              <h4 style={{ marginTop: "0", fontSize: "1.5rem" }}>
                Ed Tech apparatus
              </h4>

              <p className="about-text" style={{ textAlign: "justify" }}>
                We do have different kind of experimental products, lab handouts
                & manuals. We prepared all these practical apparatus on the
                basis of the student text books and their grade level.
              </p>
            </Col>
            <Col sm={12} md={12} lg={8} id="tabs">
              <h4 style={{ marginTop: "0", fontSize: "1.5rem" }}>
                STEM Training
              </h4>

              <p className="about-text" style={{ textAlign: "justify" }}>
                We provide quality and practical STEM training services by using
                our own EdTech apparatus. the training is supported by Teachers
                talented and qualified teachers who are networked into our
                business.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AboutUs;
