import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { aboutError, getAbout, setAboutStarted } from "../redux/aboutUsSlice";
import { getTeam, setTeamStarted, teamError } from "../redux/teamSclice";
import api, { apiUrl } from "../utils/api";
import Header from "./Layout/Header";
import Loading from "./Loading";

//import { Card, Box, Typography, Link, Chip } from "@mui/material";

import "./teams.css";

function Teams() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.team.team);
  const { teams } = response;

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

  const { pending } = useSelector((state) => state.team);

  return (
    <>
      <Header />
      <section
        style={{ marginTop: "4rem" }}
        className="section courses"
        data-section="section4"
      >
        <Container className="mt-3" fluid>
          <Row>
            <div className="col-md-12">
              <div
                className="section-heading mb-3"
                style={{ marginBottom: "0" }}
              >
                <h2 style={{ marginTop: "0" }}>The working team</h2>
              </div>
            </div>

            {pending ? (
              <Loading />
            ) : (
              <Container fluid>
                <section id="team" class="team">
                  <div class="container" data-aos="fade-up">
                    <div class="row gy-2">
                      {teams.map((member) => (
                        <div
                          key={member.id}
                          class="col-lg-3 col-md-6 d-flex align-items-stretch"
                          data-aos="fade-up"
                          data-aos-delay="100"
                        >
                          <div class="member">
                            <div class="member-img">
                              <img
                                src={`${apiUrl}/static/team/${member.photo}`}
                                class="img-fluid"
                                alt=""
                              />
                              {/* <div class="social">
                                <a href="">
                                  <i class="bi bi-twitter"></i>
                                </a>
                                <a href="">
                                  <i class="bi bi-facebook"></i>
                                </a>
                                <a href="">
                                  <i class="bi bi-instagram"></i>
                                </a>
                                <a href="">
                                  <i class="bi bi-linkedin"></i>
                                </a>
                              </div> */}
                            </div>
                            <div class="member-info">
                              <h4>{member.name}</h4>
                              <span>{member.position}</span>
                              <p>{member.qualification}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </Container>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Teams;
