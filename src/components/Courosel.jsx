import React, { useState } from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";

function Courosel() {
  const navigate = useNavigate();
  const [showLogin, setshowLogin] = useState(false);
  const [showSignUp, setshowSignUp] = useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return (
    <>
      {!loggedIn && (
        <Row
          style={{
            zIndex: "10",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Col lg={12} style={{ display: "flex", gap: "1rem" }}>
            <Button onClick={() => setshowLogin(true)}>Login</Button>
            <Button onClick={() => setshowSignUp(true)}>Join us now</Button>
          </Col>
        </Row>
      )}

      <Carousel style={{ backgroundColor: "#242424" }} interval={2000}>
        <Carousel.Item>
          <div></div>
          <img
            className="d-block w-100"
            src="assets/images/pic13-min.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Quality laboratory and experimental teaching equipment. </h3>
            <p>
              We provide the best quality laboratory teaching apparatus for
              primary, secondary and preparatory school students based on their
              text book and teaching syllabus to create practical education.{" "}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/images/pic14-min.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>High quality videos and animation tutorials </h3>
            <p>
              We prepare Videos and animation tutorials for selected topics
              which need deep understanding.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/images/pic12-min.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Practical STEM training using our products</h3>
            <p>
              We provide the best quality laboratory EdTech apparatus for
              primary, secondary and preparatory school students based on their
              text book and the current teaching curriculums.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Login show={showLogin} onHide={() => setshowLogin(false)} />
      <SignUp show={showSignUp} onHide={() => setshowSignUp(false)} />
    </>
  );
}

export default Courosel;
