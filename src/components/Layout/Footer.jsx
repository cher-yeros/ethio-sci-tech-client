import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import AddTestimony from "../AddTestimony";
import ContactUs from "../ContactUs";

function Footer() {
  const addresses = [
    {
      name: "Location",
      description: "Central Mall Hawassa, 2nd floor, Office No 217",
      icon: "bi bi-geo-alt",
      link: "https://www.google.com/maps/place/Central+Grand+Mall/@7.0493453,38.4874384,19.31z/data=!4m5!3m4!1s0x17b14f8ccde9bdf5:0xe0283528c2cce29!8m2!3d7.0490044!4d38.4874222",
    },
    {
      name: "Telephone",
      description: " +251 -(0)934865779",
      link: "tel:+251934865779",
      icon: "bi bi-telephone",
    },
    {
      name: "Email",
      description: "ethioscitechsolun@gmail.com",
      link: "mailto:ethioscitechsolun@gmail.com",
      icon: "bi bi-envelope",
    },
    {
      name: "Facebook",
      description: "Ethio-SciTech Engineering Group plc.",
      link: "https://www.facebook.com/Ethioscitech/",
      icon: "bi bi-facebook",
    },
    {
      name: "Twitter",
      description: "Ethio-SciTech Engineering Group plc.",
      link: "https://twitter.com/EthioScitech",
      icon: "bi bi-twitter",
    },
    {
      name: "Youtube",
      description: "Ethio-SciTech Engineering Group plc.",
      link: "https://www.youtube.com/channel/UCT9FnaDTz7EYmHUmGO3PEfw",
      icon: "bi bi-youtube",
    },
    {
      name: "LinkedIn",
      description: "Ethio-SciTech Engineering Group plc.",
      link: "https://www.linkedin.com/in/ethio-scitech-engineering-group-plc-29aa5b239/",
      icon: "bi bi-linkedin",
    },
    {
      name: "Telegram",
      description: "Ethio-SciTech Engineering Group plc.",
      link: "https://t.me/Ethioscitechs",
      icon: "bi bi-telegram",
    },
    {
      name: "Instagram",
      description: "Ethio-SciTech Engineering Group plc.",
      link: "https://www.instagram.com/ethioscitech/",
      icon: "bi bi-instagram",
    },
  ];

  return (
    <section
      className="page-footer contact"
      itemProp="footer"
      itemScope
      itemType="http://schema.org/WPFooter"
      style={{ paddingBottom: "0" }}
    >
      <section className="footer-first-section pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-2" itemProp="about">
              <header className="mb-3">
                <h2 style={{ color: "whitesmoke" }}>Address</h2>
              </header>{" "}
              <div class="info">
                {addresses.map((address, i) => (
                  <a href={address.link} key={address.name} target="_blank">
                    <div class="address">
                      <i class={address.icon}></i>
                      <h4>{address.name}</h4>
                      <p>{address.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {/*<div className="col-lg-6">
              <header className="mb-3">
                <h2 style={{ color: "whitesmoke" }}>Useful Links</h2>
              </header>
              <ul>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Courses</a>
                </li>
                <li>
                  <a href="#">Apparatus</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Our Mission</a>
                </li>
                <li>
                  <a href="#">Our Vision</a>
                </li>
              </ul>
            </div>*/}
            <div className="col-md-6">
              <header className="mb-3">
                <h2 style={{ color: "whitesmoke" }}>Map Location</h2>
              </header>
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.661515812725!2d38.48522811445091!3d7.049002418787385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b14f8ccde9bdf5%3A0xe0283528c2cce29!2sCentral%20Grand%20Mall!5e0!3m2!1sen!2set!4v1659633915631!5m2!1sen!2set"
                  width="100%"
                  height="350"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  frameBorder="0"
                  style={{ border: "0" }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-lg-6">
              <ContactUs />
            </div>

            <div className="col-lg-6">
              <AddTestimony />
            </div>
          </div>
          <hr className="text-white" />
          <Row style={{ gap: "0rem" }} className="justify-content-center mt-5">
            <Col sm={12} md={12} lg={6} id="tabs">
              <p>
                Copyright &copy; {new Date().getFullYear()} Ethio-SciTech
                Engineering Group PLC.
                <br />
                All Rights Reserved.
              </p>
            </Col>
          </Row>
        </div>
      </section>
      {/*<div className="footer-last-section">
        <div className="container">
          <p>
            Copyright &copy; 2022 Innovative practical Educational Solutions.
            <br />
            All Rights Reserved.
          </p>
        </div>
      </div>*/}
    </section>
  );
}

export default Footer;
