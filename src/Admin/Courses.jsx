import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { BorderColor, Delete, Launch } from "@mui/icons-material";
import moment from "moment";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import {
  addCourse,
  deleteCourse,
  getAllCourse,
  getAllKidsCourse,
  updateCourse,
} from "../redux/apis/manage-course";
import { getAllSubject } from "../redux/apis/manage-subject";
import { getSingleCourse } from "../redux/courseSlice";
import DataTable from "../utils/DataTable";
import NiceLayout from "./Layout/NiceLayout";
import { Box, IconButton, Tab } from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function Courses() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.course.course);
  const response2 = useSelector((state) => state.course.kidsCourses);
  const { courses } = response;
  const { kidsCourse } = response2;

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
    await getAllCourse(dispatch, currentPage, query);
    await getAllKidsCourse(dispatch, currentPage, query);
  };

  const handleDelete = async (row) => {
    await deleteCourse(row.id, dispatch);
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

  const onAddNew = () => {
    setShowAddRecord(true);
  };

  const columnKids = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "type", headerName: "Type", width: true },
    { field: "category", headerName: "Category", width: true },
    {
      field: "createdAt",
      headerName: "Created At",
      width: true,
      style: {
        Width: "4rem",
      },
      renderCell: (cell) => {
        return moment(cell).format("MMM Do, YYYY");
      },
    },
    {
      field: "",
      headerName: "Action",
      renderCell: (cell, row, rowIndex) => {
        return (
          <>
            <Button
              onClick={() => handleDelete(row)}
              variant="danger"
              className="btn-sm mx-1"
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
            <Link state={row} to={`/edit-course/${row.id}`}>
              <Button
                //onClick={() => handleEdit(row)}
                variant="success"
                className="btn-sm mx-1"
              >
                <i className="fas fa-edit"></i>
              </Button>
            </Link>

            <Button
              onClick={() => handleShow(row)}
              variant="info"
              className="btn-sm mx-1"
            >
              <i className="fas fa-external-link-alt"></i>
            </Button>
          </>
        );
      },
    },
  ];

  const columns = [
    { field: "title", headerName: "Title", width: 200, flex: 1 },
    { field: "type", headerName: "Type", width: 150, flex: 1 },
    {
      field: "subject.id.title",
      headerName: "Category",
      width: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return row.type === "kids-course" ? row.category : row.Subject?.title;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      flex: 1,

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
            <Link state={row} to={`/edit-course/${row.id}`}>
              <IconButton color="success" onClick={() => handleShow(row)}>
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

  const { pending } = useSelector((state) => state.course);

  const [value, setValue] = useState("video-course");
  return (
    <>
      <Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(e, nv) => setValue(nv)}
              aria-label="lab API tabs example"
            >
              <Tab label="Video courses" value="video-course" />
              <Tab label="Kids courses" value="kids-course" />
            </TabList>
          </Box>
          <TabPanel sx={{ p: 0 }} value="video-course">
            <AddVideoCourse
              pending={pending}
              courses={courses}
              columns={columns}
              onAddNew={onAddNew}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="kids-course">
            {console.log(kidsCourse)}
            <AddVideoCourse
              pending={pending}
              courses={kidsCourse}
              columns={columns}
              onAddNew={onAddNew}
            />
          </TabPanel>
        </TabContext>
      </Box>

      <VideoPlayer
        record={currentRecord}
        show={showRecord}
        onHide={(e) => setShowRecord(false)}
      />
      <AddNew show={showAddRecord} onHide={() => setShowAddRecord(false)} />
    </>
  );
}

export default Courses;

function AddVideoCourse({ pending, courses, columns, onAddNew }) {
  console.log(courses);
  return (
    <div style={{ height: "80vh" }}>
      <DataTable
        loading={pending}
        rows={courses}
        columns={columns}
        onAdd={onAddNew}
      />
    </div>
  );
}

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
                    crossOrigin="anonymous"
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
  const [course, setCourse] = useState({
    title: "",
    thumbnail: "No-thumbnail",
    SubjectId: subjects[0]?.id,
    youtubeLink: "",
    type: "video-course",
    category: "science-animation",
  });

  const [error, setError] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    await getAllSubject(dispatch);
  };

  const getInput = (e) => {
    let newInput = { ...course };
    newInput[e.target.name] = e.target.value;

    console.log(e.target.value);
    setCourse(newInput);
  };

  const getFile = (e) => {
    let newInput = { ...course };
    newInput[e.target.name] = e.target.files[0];

    //console.log(newInput);
    setCourse(newInput);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("thumbnail", course.thumbnail);
    formData.append("SubjectId", course.SubjectId || 1);
    formData.append("youtubeLink", course.youtubeLink);
    formData.append("type", course.type);
    formData.append("category", course.category);
    if (course.type === "kids-course") formData.append("SubjectId", 1);

    await addCourse(formData, dispatch, props.onHide, setError, setCourse);
    console.log(course);
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
        <h2>Add New Course</h2>
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
                  value={course.title}
                  onChange={getInput}
                  className="form-control"
                  type="headerName"
                  placeholder="Title"
                />
              </div>

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
                  Type
                </label>
                <select
                  name="type"
                  value={course.type}
                  onChange={getInput}
                  id="inputState"
                  className="form-select"
                >
                  <option value="video-course">Video course</option>
                  <option value="kids-course">Kids course</option>
                </select>
              </div>
              {course.type === "video-course" ? (
                <div className="col-md-12 mb-1">
                  <label className="mb-2" htmlFor="floatingName">
                    Subject
                  </label>
                  <select
                    name="SubjectId"
                    value={course.SubjectId}
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
              ) : (
                <div className="col-md-12 mb-1">
                  <label className="mb-2" htmlFor="floatingName">
                    Category
                  </label>
                  <select
                    name="category"
                    value={course.category}
                    onChange={getInput}
                    id="inputState"
                    className="form-select"
                  >
                    <option value="science-animation">Science animation</option>
                    <option value="entertainement">Entertainement</option>
                  </select>
                </div>
              )}

              <div className="col-md-12 mb-1">
                <ul>
                  {/* {error?.map((e) => (
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
                  ))} */}
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
function EditCourse(props) {
  const dispatch = useDispatch();
  const singleCourse = useSelector((state) => state.course.singleCourse);
  const subjects = useSelector((state) => state.subject.subject.subjects);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const [course, setCourse] = useState({
    title: singleCourse.title,
    thumbnail: singleCourse.thumbnail,
    subject: singleCourse.subject.title,
    youtubeLink: singleCourse.youtubeLink,
  });

  const [newCourse, setNewCourse] = useState({
    //title: "",
    //thumbnail: "",
    //subject: "",
    //youtubeLink: "",
  });

  const [error, setError] = useState([]);

  const fetchSubjects = async () => {
    await getAllSubject(dispatch);
  };

  const getInput = (e) => {
    setfirstTime(false);
    let newInput = { ...newCourse };
    let newInput1 = { ...course };

    newInput[e.target.name] = e.target.value;
    newInput1[e.target.name] = e.target.value;

    setNewCourse(newInput);
    setCourse(newInput1);

    //console.log(newCourse, course);
  };

  const getFile = async (e) => {
    let newInput = { ...course };
    newInput[e.target.name] = e.target.files[0];

    setCourse(newInput);

    const formData = new FormData();

    formData.append("thumbnail", e.target.files[0]);

    await updateCourse(
      singleCourse.course.id,
      formData,
      dispatch,
      singleCourse.onHide,
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

    //console.log(newCourse);

    await updateCourse(
      singleCourse.id,
      newCourse,
      dispatch,
      singleCourse.onHide,
      setError,
      setCourse
    );
    ////console.log(course);
  };

  const [firstTime, setfirstTime] = useState(true);

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
        <h2> {singleCourse.title}</h2>
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
                  value={firstTime ? singleCourse.title : course.title}
                  onChange={getInput}
                  className="form-control"
                  type="headerName"
                  placeholder="Title"
                />
              </div>
              <div className="col-md-12 mb-1">
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
              </div>
              <div className="col-md-12 mb-1">
                <label className="mb-2" htmlFor="floatingName">
                  Youtube Link
                </label>
                <input
                  name="youtubeLink"
                  value={
                    firstTime ? singleCourse.youtubeLink : course.youtubeLink
                  }
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
                  {/* {error?.map((e) => (
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
                  ))} */}
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
