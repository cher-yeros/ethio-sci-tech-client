import React, { useEffect, useState } from "react";
import { Alert, Modal, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/apis/manage-user";

import Axios from "axios";
import FileDownload from "js-file-download";
import moment from "moment";

import {
  DownloadForOfflineOutlined,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { addCourse, updateCourse } from "../redux/apis/manage-course";
import { getAllOthersCourse } from "../redux/apis/manage-others-course";
import { getAllSubject } from "../redux/apis/manage-subject";
import { getSingleCourse } from "../redux/courseSlice";
import api, { apiUrl } from "../utils/api";
import DataTable from "../utils/DataTable";
import NiceLayout from "./Layout/NiceLayout";

function OthersCourse() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.othersCourse.course);
  const { courses } = response;

  const [showRecord, setShowRecord] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [ShowEditRecord, setShowEditRecord] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllOthersCourse(dispatch, currentPage, query);
  };

  const handleDelete = async (row) => {
    await deleteUser(row.id, dispatch);
    fetchData();
  };

  const handlePlay = (row) => {
    setCurrentRecord(row);
    setShowRecord(true);
  };

  const handleApprove = async (row) => {
    const { data } = await api.post("/course/approve-course/" + row.id);
    fetchData();
  };
  const handleDisapprove = async (row) => {
    const { data } = await api.post("/course/disapprove-course/" + row.id);
    fetchData();
  };

  const handleEdit = async (row) => {
    //console.log(row);
    dispatch(getSingleCourse(row));
    setCurrentRecord(row);
    setShowEditRecord(true);
  };

  const handleDownload = async (row) => {
    const extention = row.video.substring(
      row.video.lastIndexOf("."),
      row.video.length
    );

    Axios({
      baseURL: `${apiUrl}/api/v1/course/play-course/${row.video}`,
      withCredentials: true,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        setDownloading(true);
        const { loaded, total } = progressEvent;
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        //console.log(percentCompleted, "% of ", total, " loaded: " + loaded);
      },
    }).then((res) => {
      setDownloading(false);
      FileDownload(res.data, row.title + extention);
    });
  };

  const columns = [
    {
      field: "user.name",
      headerName: "Teacher Name",
      width: 200,
      flex: 1,
      renderCell: ({ row }) => {
        return row.User?.name;
      },
    },
    {
      field: "subject.title",
      headerName: "Subject",
      width: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return row.Subject?.title;
      },
    },
    { field: "title", headerName: "Title", width: 250, flex: 1.5 },
    {
      field: "createdAt",
      headerName: "Created At",
      sort: true,
      width: 200,
      flex: 1,
      renderCell: ({ value }) => {
        return moment(value).format("MMM Do, YYYY");
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      flex: 1.2,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              startIcon={<PlayCircleOutlineOutlined />}
              variant="contained"
              size="small"
              onClick={() => handlePlay(row)}
              className="mx-1"
            >
              Play
            </Button>
            <Button
              startIcon={<DownloadForOfflineOutlined />}
              onClick={() => handleDownload(row)}
              variant="contained"
              size="small"
              className="mx-1"
            >
              Downlaod
            </Button>
          </>
        );
      },
    },
  ];

  const { pending } = useSelector((state) => state.othersCourse);

  return (
    <>
      <>
        <div style={{ height: "85vh" }}>
          <DataTable
            loading={pending}
            rows={courses}
            columns={columns}
            //onAdd={onAddNew}
          />
        </div>
      </>
      <AddNew show={showAddRecord} onHide={() => setShowAddRecord(false)} />
      <ShowRecordDetail
        record={currentRecord}
        show={showRecord}
        onHide={() => setShowRecord(false)}
      />
      <Downloading show={downloading} onHide={() => setShowRecord(false)} />
    </>
  );
}

export default OthersCourse;

function Downloading(props) {
  const { record } = props;
  return (
    <Modal
      {...props}
      backdrop="static"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Body style={{ padding: ".3rem" }} className="my-3">
        <div className="d-flex justify-content-center ">
          <Spinner
            style={{
              top: "0",
              left: "0%",
            }}
            animation="border"
            variant="primary"
          />
        </div>

        <div className="mt-4" style={{ headerNameAlign: "center" }}>
          Downloading...
        </div>
      </Modal.Body>
    </Modal>
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
        <video width="100%" height="500px" controls="controls">
          <source
            src={`${apiUrl}/api/v1/course/play-course/${record.video}`}
            type="video/mp4"
          />
        </video>
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
    thumbnail: "",
    subject: "",
    youtubeLink: "",
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
    formData.append("subject", course.subject);
    formData.append("youtubeLink", course.youtubeLink);

    await addCourse(formData, dispatch, props.onHide, setError, setCourse);
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
