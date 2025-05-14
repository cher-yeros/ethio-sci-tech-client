import React, { useEffect, useState } from "react";
import { Alert, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { Delete, Launch } from "@mui/icons-material";
import { addCourse, updateCourse } from "../redux/apis/manage-course";
import { getAllSubject } from "../redux/apis/manage-subject";
import { getSingleCourse } from "../redux/courseSlice";
import {
  feedbackError,
  getAllfeedback,
  getfeedbackStarted,
} from "../redux/feedbackSlice";
import api from "../utils/api";
import DataTable from "../utils/DataTable";
import NiceLayout from "./Layout/NiceLayout";
import { Button } from "@mui/material";

function Feedbacks() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.feedback.feedback);
  const { feedbacks } = response;

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
    //await getAllTestimony(dispatch, currentPage, query);

    dispatch(getfeedbackStarted());
    try {
      const { data } = await api.get("/feedback/all-feedbacks");
      dispatch(getAllfeedback(data));
    } catch (error) {
      dispatch(feedbackError(error?.response?.data?.message));
    }
  };

  const handleDelete = async (row) => {
    //await deleteUser(row.id, dispatch);
    const { data } = await api.delete("/feedback/delete-feedback/" + row.id);
    fetchData();
  };

  const handleShow = (row) => {
    setCurrentRecord(row);
    setShowRecord(true);
  };

  const handleApprove = async (row) => {
    const { data } = await api.post("/admin/approve-testimony/" + row.id);
    fetchData();
  };
  const handleDisapprove = async (row) => {
    const { data } = await api.post("/admin/deactivate-testimony/" + row.id);
    fetchData();
  };

  const handleEdit = async (row) => {
    //console.log(row);
    dispatch(getSingleCourse(row));
    setCurrentRecord(row);
    setShowEditRecord(true);
  };

  const columns = [
    { field: "name", headerName: "User fullname", width: 200, flex: 1 },
    { field: "email", headerName: "Email", width: 250, flex: 1 },
    //{ field: "message", headerName: "Message", },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      flex: 1,
      renderCell: ({ value }) => {
        return moment(value).format("MMM Do, YYYY");
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              variant="contained"
              startIcon={<Delete />}
              color="error"
              onClick={() => handleDelete(row)}
              className="mx-1"
              size="small"
            >
              Delete
            </Button>
            <Button
              variant="contained"
              startIcon={<Launch />}
              color="primary"
              onClick={() => handleShow(row)}
              className="mx-1"
              size="small"
            >
              Show
            </Button>
          </>
        );
      },
    },
  ];

  const { pending } = useSelector((state) => state.feedback);

  return (
    <>
      <div style={{ height: "85vh" }}>
        <DataTable
          loading={pending}
          rows={feedbacks}
          columns={columns}
          //onAdd={onAddNew}
        />
      </div>
      <AddNew show={showAddRecord} onHide={() => setShowAddRecord(false)} />
      <ShowRecordDetail
        record={currentRecord}
        show={showRecord}
        onHide={() => setShowRecord(false)}
      />
    </>
  );
}

export default Feedbacks;

function ShowRecordDetail(props) {
  const { record } = props;
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
        <h2>Feedback</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className="item border p-2" style={{ margin: "1rem" }}>
          <div className="down-content">
            <h4>Name : {record.name}</h4>
            <h5>
              Email : {/*<a href={`mailto: ${record.email}`}>*/}
              {record.email}
              {/*</a>*/}
            </h5>
            {record?.user && (
              <h5>
                Phone : {/*<a href={`mailto: ${record.email}`}>*/}
                {record?.user?.phone}
                {/*</a>*/}
              </h5>
            )}

            <p>{record.message}</p>
            <div
              className="prof"
              style={{
                display: "flex",
                gap: "1rem",

                alignItems: "center",
              }}
            >
              <div className="author-image">
                <img
                  className="rounded-circle"
                  src="assets/images/default-user.jpg"
                  alt="Author 2"
                  style={{ width: "4rem", borderRadius: "50%" }}
                />
              </div>
              <div className="pi">
                <h6>
                  <strong>{record.name}</strong>
                </h6>
                <h6 style={{ headerNameTransform: "uppercase" }}>
                  {record?.role}
                </h6>
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
