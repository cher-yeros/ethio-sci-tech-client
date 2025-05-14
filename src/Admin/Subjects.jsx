import { BorderColor, Delete, Launch } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import {
  addSubject,
  deleteSubject,
  getAllSubject,
} from "../redux/apis/manage-subject";
import { getSingleCourse } from "../redux/courseSlice";
import DataTable from "../utils/DataTable";
import NiceLayout from "./Layout/NiceLayout";

function Subjects() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.subject.subject);
  const { subjects } = response;

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
    await getAllSubject(dispatch, currentPage, query);
  };

  const handleDelete = async (row) => {
    await deleteSubject(row.id, dispatch);
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
    { field: "title", headerName: "Name", width: 200, flex: 1 },
    { field: "category", headerName: "Category", width: 200, flex: 1 },
    { field: "description", headerName: "Description", width: 350, flex: 2 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color="error" onClick={() => handleDelete(row)}>
              <Delete />
            </IconButton>
            <Link state={row} to={`/edit-subject/${row.id}`}>
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

  const addNew = () => {
    setShowAddRecord(true);
  };
  const { pending } = useSelector((state) => state.subject);

  return (
    <>
      <div style={{ height: "85vh" }}>
        <DataTable
          loading={pending}
          rows={subjects}
          columns={columns}
          onAdd={addNew}
        />
      </div>
      <VideoPlayer
        record={currentRecord}
        show={showRecord}
        onHide={(e) => setShowRecord(false)}
      />
      <AddNew show={showAddRecord} onHide={() => setShowAddRecord(false)} />
      <EditSubject
        record={currentRecord}
        show={ShowEditRecord}
        onHide={() => setShowEditRecord(false)}
      />
    </>
  );
}

export default Subjects;

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
        <h2>{record.title}</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        {/*<VideoPlayer link={record.youtubeLink} />
        <YouTube
          className="youtube-player"
          videoId={videoId}
          opts={opts}
          loading="Loading"
          onReady={_onReady}
        />*/}
        <div className="section profile">
          <div className="row">
            <div className="col-xl-3 col-lg-3">
              <div className="">
                <div className="card-body profile-card py-2 border d-flex flex-column align-items-center">
                  <img
                    style={{ width: "100% !important", maxWidth: "100%" }}
                    id="pImg"
                    src="assets/images/profile.jpg"
                    //src={`https://www.bing.com/images/search?view=detailV2&ccid=LSFwRbLu&id=68785F479305ACFEC9C0A47B2F18801F57199E6C&thid=OIP.LSFwRbLuXsFjvFe021k0LQHaHC&mediaurl=https%3a%2f%2fi.imgur.com%2fOD9XEljl.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.2d217045b2ee5ec163bc57b4db59342d%3frik%3dbJ4ZVx%252bAGC97pA%26pid%3dImgRaw%26r%3d0%26sres%3d1%26sresct%3d1%26srh%3d800%26srw%3d842&exph=475&expw=500&q=profile&simid=608023951985284612&FORM=IRPRST&ck=0329EAAD82BE619DFBC3001140A6D7F8&selectedIndex=39`}
                    alt="Profile"
                    className="w-100"
                  />
                  {/*<h4>Yerosen Diriba</h4>*/}
                  <h3 style={{ headerNameTransform: "capitalize" }}></h3>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9">
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
                        Profile Details
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
        <div className="col-lg-3 col-md-4 label ">Full Name</div>
        <div className="col-lg-9 col-md-8">{user.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Username</div>
        <div className="col-lg-9 col-md-8">{user.username}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-9 col-md-8">{user.email}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-9 col-md-8">{user.phone}</div>
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
  const subjects = useSelector((state) => state.subject.subject.subjects);
  const [subject, setSubject] = useState({
    category: "",
    title: "",
    category: "natural science",
    description: "",
  });

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const getInput = (e) => {
    let newInput = { ...subject };
    newInput[e.target.name] = e.target.value;

    setSubject(newInput);
  };

  //const getFile = (e) => {
  //  let newInput = { ...course };
  //  newInput[e.target.name] = e.target.files[0];

  //  //console.log(newInput);
  //  setCourse(newInput);
  //};

  const submit = async (e) => {
    e.preventDefault();

    //const formData = new FormData();
    //formData.append("title", course.title);
    //formData.append("thumbnail", course.thumbnail);
    //formData.append("subject", course.subject);
    //formData.append("youtubeLink", course.youtubeLink);

    await addSubject(
      subject,
      dispatch,
      props.onHide,
      setError,
      setSubject,
      setSuccess
    );
    ////console.log(course);
  };
  return (
    <Modal
      {...props}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <h2>Add New Subject</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className=" ">
          <div className="card-body">
            <form className="row g-3">
              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Title
                </label>
                <input
                  name="title"
                  value={subject.title}
                  onChange={getInput}
                  className="form-control"
                  type="headerName"
                  placeholder="Title"
                />
              </div>

              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Category
                </label>
                <select
                  name="category"
                  value={subject.category}
                  onChange={getInput}
                  id="inputState"
                  className="form-select"
                >
                  <option value="natural science">Natural Science</option>
                  <option value="social science">Social Science</option>
                  <option value="history and art">History & Art</option>
                  <option value="science and technology">
                    Science and Technology
                  </option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Description
                </label>
                <textarea
                  name="description"
                  value={subject.description}
                  onChange={getInput}
                  className="form-control"
                  placeholder="Description"
                  rows="4"
                ></textarea>
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
                <div className="headerName-center">
                  <div className="headerName-center">
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
    </Modal>
  );
}
function EditSubject(props) {
  const { record } = props;
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subject.subjects);
  const [subject, setSubject] = useState(record);

  useEffect(() => {
    setSubject({
      code: "",
      title: record.title,
      description: record.description,
    });
  }, []);

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const getInput = (e) => {
    let newInput = { ...subject };
    newInput[e.target.name] = e.target.value;

    setSubject(newInput);
  };

  //const getFile = (e) => {
  //  let newInput = { ...course };
  //  newInput[e.target.name] = e.target.files[0];

  //  //console.log(newInput);
  //  setCourse(newInput);
  //};

  const submit = async (e) => {
    e.preventDefault();

    //const formData = new FormData();
    //formData.append("title", course.title);
    //formData.append("thumbnail", course.thumbnail);
    //formData.append("subject", course.subject);
    //formData.append("youtubeLink", course.youtubeLink);

    await addSubject(
      subject,
      dispatch,
      props.onHide,
      setError,
      setSubject,
      setSuccess
    );
    ////console.log(course);
  };
  return (
    <Modal
      {...props}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <h2>Edit {record.title}</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className=" ">
          <div className="card-body">
            <form className="row g-3">
              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Title
                </label>
                <input
                  name="title"
                  value={subject.title}
                  onChange={getInput}
                  className="form-control"
                  type="headerName"
                  placeholder="Title"
                />
              </div>

              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Code
                </label>
                <input
                  name="code"
                  value={subject.code}
                  onChange={getInput}
                  className="form-control"
                  type="number"
                  placeholder="Code"
                />
              </div>
              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Description
                </label>
                <textarea
                  name="description"
                  value={subject.description}
                  onChange={getInput}
                  className="form-control"
                  placeholder="Description"
                  rows="4"
                ></textarea>
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
                <div className="headerName-center">
                  <div className="headerName-center">
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
    </Modal>
  );
}
