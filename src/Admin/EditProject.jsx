import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateApparatus } from "../redux/apis/manage-apparatus";
import { updateProject } from "../redux/apis/manage-projects";
import api, { apiUrl } from "../utils/api";
import NiceLayout from "./Layout/NiceLayout";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function EditProject() {
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    name: "",
    startDate: "",
    location: "",
    description: "",
    photo: "",
  });

  const { id } = useParams();

  const [error, setError] = useState([]);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    //await getAllSubject(dispatch);
    const { data } = await api.get("/admin/project/" + id);
    setProject({
      name: data.project.name,
      startDate: data.project.startDate,
      location: data.project.location,
      description: data.project.description,
      photo: data.project.photo,
    });
  };

  const getInput = (e) => {
    let newInput = { ...project };
    newInput[e.target.name] = e.target.value;

    setProject(newInput);
  };

  const getFile = async (e) => {
    //let newInput = { ...apparatus };
    //newInput[e.target.name] = e.target.files[0];

    ////console.log(newInput);
    //setProject(newInput);

    var output = document.getElementById("photo");
    output.src = URL.createObjectURL(e.target.files[0]);

    const formData = new FormData();

    formData.append("photo", e.target.files[0]);
    await updateProject(id, formData, dispatch, setError, setProject);
    fetchProject();
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", project.name);
    formData.append("startDate", project.startDate);
    formData.append("location", project.location);
    formData.append("description", project.description);
    //formData.append("photo", project.photo);
    //formData.append("photo", apparatus.photo);

    await updateProject(id, formData, dispatch, setError, setProject);
    ////console.log(course);
  };

  return (
    //<NiceLayout>
    <Container className="">
      <Row>
        <Col lg={8}>
          <div className="card py-4">
            <div className="card-body">
              <form className="row g-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Select Photo
                      </label>
                      <img
                        id="photo"
                        style={{
                          maxWidth: "100%",
                          margin: "auto",
                          display: "block",
                          border: "3px dotted",
                          minHeight: "12rem",
                        }}
                        src={`${apiUrl}/static/project/${project.photo}`}
                        onClick={() =>
                          document.getElementById("upload-photo").click()
                        }
                      />

                      <input
                        onChange={getFile}
                        style={{ display: "none" }}
                        type="file"
                        name="photo"
                        id="upload-photo"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Title
                      </label>
                      <input
                        name="name"
                        value={project.name}
                        onChange={getInput}
                        className="form-control"
                        type="text"
                        placeholder="Title"
                      />
                    </div>
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Area or Location
                      </label>
                      <input
                        name="location"
                        value={project.location}
                        onChange={getInput}
                        className="form-control"
                        type="text"
                        placeholder="Area or Location"
                      />
                    </div>

                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Start Date
                      </label>
                      <input
                        name="startDate"
                        value={project.startDate}
                        onChange={getInput}
                        className="form-control"
                        type="date"
                        placeholder="Start Date"
                      />
                    </div>
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={project.description}
                        onChange={getInput}
                        className="form-control"
                        type="date"
                        placeholder="Start Date"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
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
        </Col>
      </Row>
    </Container>
    //<NiceLayout>
  );
}

export default EditProject;
