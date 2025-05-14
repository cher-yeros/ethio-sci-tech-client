import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { aboutError, getAbout, setAboutStarted } from "../redux/aboutUsSlice";
import api from "../utils/api";

function Vision() {
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
            <Col sm={6} md={4} lg={8} id="tabs">
              <h4>Our Vision</h4>
              <p className="about-text" style={{ textAlign: "justify" }}>
                
              
                {abouts.vision}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Vision;
