import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";

import { aboutError, getAbout, setAboutStarted } from "../redux/aboutUsSlice";
import api from "../utils/api";
import NiceLayout from "./Layout/NiceLayout";

function AboutUs() {
  const dispatch = useDispatch();
  const abouts = useSelector((state) => state.about.about.about);
  //const { about } = response;

  const [showRecord, setShowRecord] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [ShowEditRecord, setShowEditRecord] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const [about, setAbout] = useState({
    about: abouts.about,
    mission: abouts.mission,
    vision: abouts.vision,
    goal: abouts.goal,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setAboutStarted());

    try {
      const { data } = await api.get("/admin/about");
      dispatch(getAbout(data));
    } catch (error) {
      dispatch(aboutError(error.response.data.message));
    }
  };

  const getInput = (e) => {
    let newInput = { ...about };
    newInput[e.target.name] = e.target.value;

    setAbout(newInput);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/admin/add-about", about);
      fetchData();
      alert("Updated Successfully!");
    } catch (error) {
      dispatch(aboutError(error.response.data.message));
    }
  };
  const { pending } = useSelector((state) => state.apparatus);

  return (
    //<NiceLayout>
    <>
      {" "}
      {pending ? (
        <Loading />
      ) : (
        <>
          <Row className="mt-3 ">
            <Col lg={6}>
              <div className="card card-body pt-3">
                <form className="row g-3">
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      About
                    </label>
                    <textarea
                      name="about"
                      value={about.about || abouts.about}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="About"
                      rows={8}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mb-1">
                    <Button className="btn-sm" onClick={submit}>
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card card-body pt-3">
                <form className="row g-3">
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Mission
                    </label>
                    <textarea
                      name="mission"
                      value={about.mission || abouts.mission}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Mission"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mb-1">
                    <Button className="btn-sm" onClick={submit}>
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
          <Row className="mt-2 ">
            <Col lg={6}>
              <div className="card card-body pt-3">
                <form className="row g-3">
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Vision
                    </label>
                    <textarea
                      name="vision"
                      value={about.vision || abouts.vision}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Vision"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mb-1">
                    <Button className="btn-sm" onClick={submit}>
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card card-body pt-3">
                <form className="row g-3">
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Goal
                    </label>
                    <textarea
                      name="goal"
                      value={about.goal || abouts.goal}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Goal"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mb-1">
                    <Button className="btn-sm" onClick={submit}>
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>

    //<NiceLayout>
  );
}

export default AboutUs;
