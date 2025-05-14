import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { approvedTestimonies } from "../redux/apis/manage-testimony";
import Header from "./Layout/Header";
import SingleTestimony from "./SingleTestimony";
//import Testmony1 from "./Testmony1";

function Testimony() {
  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        <Container fluid>
          <Row className="pt-3">
            <div className="col-md-12">
              <div className="section-heading" style={{ marginBottom: "0" }}>
                <h2 style={{ marginTop: "0" }}>Testimonies</h2>
              </div>
            </div>
            <SingleTestimony />
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Testimony;
