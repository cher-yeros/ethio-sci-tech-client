import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCourse } from "../redux/apis/manage-course";
import { getAllSubject } from "../redux/apis/manage-subject";
import api from "../utils/api";
import NiceLayout from "./Layout/NiceLayout";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function EditCourse(props) {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.subject.subject.subjects);
  const singleCourse = useSelector((state) => state.course.singleCourse);

  const { id } = useParams();

  //console.log(id);
  useEffect(() => {
    fetchCourse();
    fetchSubjects();
  }, []);
  //  const [singleCourse, setsingleCourse] = useState({});
  const fetchCourse = async () => {
    const { data } = await api.get("/course/course/" + id);
    setCourse({
      title: data.course.title,
      thumbnail: data.course.thumbnail,
      subject: data.course.subject.id,
      youtubeLink: data.course.youtubeLink,
    });
    //setCourse({
    //  title: singleCourse.title,
    //  thumbnail: singleCourse.thumbnail,
    //  subject: singleCourse.subject.id,
    //  youtubeLink: singleCourse.youtubeLink,
    //});
  };
  //console.log(singleCourse);

  const [course, setCourse] = useState({
    title: singleCourse.title,
    thumbnail: singleCourse.thumbnail,
    subject: singleCourse.subject?.id,
    youtubeLink: singleCourse.youtubeLink,
  });

  const [newCourse, setNewCourse] = useState({
    title: "",
    thumbnail: "",
    subject: "",
    youtubeLink: "",
  });

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const fetchSubjects = async () => {
    await getAllSubject(dispatch);
  };

  const getInput = (e) => {
    let newInput = { ...newCourse };
    let newInput1 = { ...course };

    newInput[e.target.name] = e.target.value;
    newInput1[e.target.name] = e.target.value;

    setNewCourse(newInput);
    setCourse(newInput1);
  };

  const getFile = async (e) => {
    let newInput = { ...course };
    newInput[e.target.name] = e.target.files[0];

    setCourse(newInput);

    const formData = new FormData();

    formData.append("thumbnail", e.target.files[0]);

    await updateCourse(
      props.course.id,
      formData,
      dispatch,
      setSuccess,
      setError,
      setCourse
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("thumbnail", course.thumbnail);
    formData.append("subject", course.subject);
    formData.append("youtubeLink", course.youtubeLink);

    //console.log(course);
    await updateCourse(id, course, dispatch, props.onHide, setError, setCourse);
    ////console.log(course);
  };
  return (
    //<NiceLayout>
    <div className="card ">
      <div className="card-body">
        <form className="row g-3">
          <div className="col-md-12 mb-1">
            <label className="mb-2" htmlFor="floatingName">
              Title
            </label>
            <input
              name="title"
              value={course.title}
              onChange={getInput}
              className="form-control"
              type="text"
              placeholder="Title"
            />
          </div>
          {/*<div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Thumbnail
                </label>
                <input
                  name="thumbnail"
                  onChange={getFile}
                  className="form-control"
                  type="file"
                  placeholder="Thumbnail"
                  accept="image/*"
                />
              </div>*/}
          <div className="col-md-12 mb-1">
            <label className="mb-2" htmlFor="floatingName">
              Youtube Link
            </label>
            <input
              name="youtubeLink"
              value={course.youtubeLink}
              onChange={getInput}
              className="form-control"
              type="url"
              placeholder="Youtube Link"
            />
          </div>
          <div className="col-md-12 mb-1">
            <label className="mb-2" htmlFor="floatingName">
              Subject
            </label>
            <select
              name="subject"
              value={course.subject}
              onChange={getInput}
              id="inputState"
              className="form-select"
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-12 mb-1">
            <ul>
              {error?.map((e) => (
                <li>
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
              {success?.map((e) => (
                <li>
                  <Alert
                    //className="mx-1"
                    style={{ padding: ".4rem", margin: ".2rem" }}
                    key={e}
                    variant="success"
                  >
                    {e}
                  </Alert>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-12 mb-1">
            <div className="text-center">
              <div className="text-center">
                <button
                  onClick={submit}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    //<NiceLayout>
  );
}

export default EditCourse;
