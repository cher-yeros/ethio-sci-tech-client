import React, { useEffect, useState } from "react";
import { Alert, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubject } from "../redux/apis/manage-subject";
import {
  addothersCourseEnd,
  getothersCourseStarted,
  othersCourseError,
} from "../redux/othersCourseSlice";
import api from "../utils/api";
import Header from "./Layout/Header";
import axios from "axios";
function AddOthersCourse() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subject.subjects);
  const { currentUser, loggedIn } = useSelector((state) => state.user);

  const [course, setCourse] = useState({
    UserId: loggedIn ? currentUser.user.id : null,
    title: "",
    SubjectId: subjects[0].id,
    video: "",
  });
  const [error, setError] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    await getAllSubject(dispatch);
  };

  const getInput = (e) => {
    let newInput = { ...course };
    newInput[e.target.name] = e.target.value;

    setCourse(newInput);
  };

  const getFile = (e) => {
    let newInput = { ...course };
    newInput[e.target.name] = e.target.files[0];

    setCourse(newInput);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("SubjectId", course.SubjectId);
    formData.append("UserId", course.UserId);
    formData.append("video", course.video);

    ////console.log(course);
    dispatch(getothersCourseStarted());

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        ////console.log(` ${loaded} kb of ${total} kb | ${percent}`);
        setProgress(percent);
      },
    };

    //axios
    //  .post("127.0.0.1:4000/api/v1/course/add-others-course", formData)
    //  .then((res) => {
    //    dispatch(addothersCourseEnd());
    //    alert("Yout have successfully added a course!");
    //    setError([]);
    //    setCourse({
    //      user: loggedIn ? currentUser.user.id : null,
    //      title: "",
    //      subject: "",
    //      video: "",
    //    });
    //  })
    //  .catch((error) => {
    //    setError(error?.response?.data?.message.split(","));
    //    dispatch(othersCourseError(error?.response?.data?.message.split(",")));
    //  });

    try {
      const { data } = await api.post(
        "/course/add-others-course",
        formData,
        options
      );
      dispatch(addothersCourseEnd());
      alert("Yout have successfully added a course!");
      setError([]);
      setCourse({
        user: loggedIn ? currentUser.user.id : null,
        title: "",
        SubjectId: "",
        video: "",
      });

      setTimeout(() => {
        setProgress(0);
      }, 500);
    } catch (error) {
      setError(error?.response?.data?.message.split(","));
      dispatch(othersCourseError(error?.response?.data?.message.split(",")));
    }
  };
  return (
    <>
      <Header />
      <section style={{ marginTop: "4rem" }} className="contact">
        <Container style={{ paddingTop: "1rem" }} fluid>
          <Row style={{ rowGap: "1rem" }} className="justify-content-center">
            <Col sm={12} md={10} lg={6}>
              <form id="contac" action="" method="post">
                <div className="col-md-12 pb-4">
                  <div
                    className="section-heading"
                    style={{ marginBottom: "0" }}
                  >
                    <h2 style={{ marginTop: "0" }}>Upload Course</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <fieldset>
                      <input
                        name="title"
                        value={course.title}
                        onChange={getInput}
                        type="text"
                        className="form-control"
                        id="name2"
                        placeholder="Enter Title"
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <select
                        name="SubjectId"
                        value={course.SubjectId}
                        onChange={getInput}
                        className="form-control"
                        aria-label="Default select example"
                      >
                        {subjects.map((subject, i) => (
                          <option key={i} value={subject.id}>
                            {subject.title}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <fieldset>
                      <input
                        name="video"
                        onChange={getFile}
                        accept="video/*"
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </fieldset>
                  </div>

                  <div className="col-md-12 mb-4">
                    {progress > 0 && (
                      <ProgressBar
                        variant="success"
                        now={progress}
                        label={`${progress} %`}
                        animated
                      />
                    )}
                  </div>
                  <div className="col-md-12 mb-1">
                    <ul>
                      {error?.map((e, i) => (
                        <li key={i}>
                          <Alert
                            //className="mx-1"
                            style={{ padding: ".4rem", margin: ".2rem" }}
                            key={e}
                            variant="danger"
                          >
                            {e}
                          </Alert>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-12">
                    <fieldset style={{ display: "flex", gap: "1rem" }}>
                      <button
                        onClick={submit}
                        type="submit"
                        id="form-sub"
                        className="button"
                      >
                        Upload
                      </button>
                      {/*<button className="button">Close</button>*/}
                    </fieldset>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AddOthersCourse;
