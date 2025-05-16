import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { Link } from "react-router-dom";
import {
  addProject,
  deleteProject,
  getAllProject,
} from "../redux/apis/manage-projects";
import { getSingleCourse } from "../redux/courseSlice";
import { apiUrl } from "../utils/api";
import DataTable from "../utils/DataTable";
import LandscapeImageCropper from "./LandscapeImageCropper";
import NiceLayout from "./Layout/NiceLayout";
import { IconButton } from "@mui/material";
import { BorderColor, Delete, Launch } from "@mui/icons-material";
function Projects() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.project.project);
  const { projects } = response;

  const [showRecord, setShowRecord] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [ShowEditRecord, setShowEditRecord] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllProject(dispatch, currentPage, query);
  };

  const handleDelete = async (row) => {
    await deleteProject(row.id, dispatch);
    fetchData();
  };

  const handleShow = (row) => {
    setCurrentRecord(row);
    setShowRecord(true);
  };

  const handleEdit = async (row) => {
    //console.log(row);
    dispatch(getSingleCourse(row));
    setCurrentRecord(row);
    setShowEditRecord(true);
  };

  const columns = [
    { field: "name", headerName: "Title", width: 200, flex: 1 },
    { field: "location", headerName: "Location", width: 200, flex: 1 },
    //{ field: "description", headerName: "Description", width: 200,},
    {
      field: "startDate",
      headerName: "Starting Date",
      width: 200,
      flex: 1,
      style: {
        Width: "4rem",
      },
      formatter: (cell) => {
        return moment(cell).format("MMM Do, YYYY");
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 200,
      flex: 1,
      style: {
        Width: "4rem",
      },
      renderCell: ({ value }) => {
        return moment(value).format("MMM Do, YYYY");
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color="error" onClick={() => handleDelete(row)}>
              <Delete />
            </IconButton>
            <Link state={row} to={`/edit-project/${row.id}`}>
              <IconButton color="success">
                <BorderColor />
              </IconButton>
            </Link>
            <IconButton color="primary" onClick={() => handleShow(row)}>
              <Launch />
            </IconButton>
          </>
        );
      },
    },
  ];

  const { pending } = useSelector((state) => state.project);

  const addNew = () => setShowAddRecord(true);
  return (
    <div>
      <>
        <div style={{ height: "85vh" }}>
          <DataTable
            loading={pending}
            rows={projects}
            columns={columns}
            onAdd={addNew}
          />
        </div>
      </>
      <AddNew show={showAddRecord} onHide={() => setShowAddRecord(false)} />
      <ShowRecordDetail
        record={currentRecord}
        show={showRecord}
        onHide={() => setShowRecord(false)}
      />
    </div>
  );
}

export default Projects;

function ShowRecordDetail(props) {
  const { record } = props;
  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <h2>Show Projects</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className="section profile">
          <div className="row">
            <div className="-9 col-lg-6">
              <div className=" border ">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                        style={{ fontSize: ".9rem" }}
                      >
                        Project Details
                      </button>
                    </li>

                    {/*<li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>*/}

                    {/*<li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>*/}
                  </ul>

                  <div className="tab-content pt-2">{OverView(record)}</div>
                </div>
              </div>
            </div>
            <div className="-3 col-lg-6">
              <div className="">
                <div className="card-body profile-card py-2 border d-flex flex-column align-items-center">
                  <img
                    crossOrigin="anonymous"
                    style={{ width: "100% !important", maxWidth: "100%" }}
                    id="pImg"
                    src={`${apiUrl}/static/project/${record.photo}`}
                    //src={`https://www.bing.com/images/search?view=detailV2&ccid=LSFwRbLu&id=68785F479305ACFEC9C0A47B2F18801F57199E6C&thid=OIP.LSFwRbLuXsFjvFe021k0LQHaHC&mediaurl=https%3a%2f%2fi.imgur.com%2fOD9XEljl.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.2d217045b2ee5ec163bc57b4db59342d%3frik%3dbJ4ZVx%252bAGC97pA%26pid%3dImgRaw%26r%3d0%26sres%3d1%26sresct%3d1%26srh%3d800%26srw%3d842&exph=475&expw=500&q=profile&simid=608023951985284612&FORM=IRPRST&ck=0329EAAD82BE619DFBC3001140A6D7F8&selectedIndex=39`}
                    alt="Profile"
                    className="w-100"
                  />
                  {/*<h4>Yerosen Diriba</h4>*/}
                  <h3 style={{ textTransform: "capitalize" }}></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function OverView(user) {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      {/*<h5 className="card-title">Profile Details</h5>*/}

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Title</div>
        <div className="col-lg-9 col-md-8">{user.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Location</div>
        <div className="col-lg-9 col-md-8">{user.location}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Starting Date</div>
        <div className="col-lg-9 col-md-8">{user.startDate}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Description</div>
        <div className="col-lg-9 col-md-8">{user.description} ETB</div>
      </div>
      {/*
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{user.address}</div>
      </div>*/}
    </div>
  );
}

function AddNew(props) {
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    name: "",
    startDate: "",
    location: "",
    description: "",
    photo: "",
  });

  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...project };
    newInput[e.target.name] = e.target.value;

    setProject(newInput);
  };

  const [showImageCropper, setShowImageCropper] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  useEffect(() => {
    if (photoUrl !== null) {
      var output = document.getElementById("photo");
      output.src = photoUrl;
    }
  }, [photoUrl]);

  const imageCropDone = (e) => {
    var output = document.getElementById("photo");
    output.src = photoUrl;
  };

  const getFile = (e) => {
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));

    setShowImageCropper(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", project.name);
    formData.append("startDate", project.startDate);
    formData.append("location", project.location);
    formData.append("description", project.description);
    formData.append("photo", croppedFile);

    await addProject(formData, dispatch, props.onHide, setError, setProject);
    ////console.log(course);
  };
  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <h2>Add New project</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: "1.5rem" }}>
        <div className=" ">
          <div className="card-body">
            <form className="row g-3">
              <div className="row">
                <div className="col-lg-6">
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Select Photo
                    </label>
                    <img
                      crossOrigin="anonymous"
                      id="photo"
                      style={{
                        maxWidth: "100%",
                        margin: "auto",
                        display: "block",
                        border: "3px dotted",
                        minHeight: "12rem",
                      }}
                      src=""
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
                      maxLength={150}
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
      </Modal.Body>
      <LandscapeImageCropper
        show={showImageCropper}
        onHide={(e) => setShowImageCropper(false)}
        photoUrl={photoUrl}
        setCroppedFile={setCroppedFile}
        setPhotoUrl={setPhotoUrl}
        onDone={imageCropDone}
      />
    </Modal>
  );
}
