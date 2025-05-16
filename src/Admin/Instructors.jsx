import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUser } from "../redux/apis/manage-user";

import Loading from "../components/Loading";
import Layout from "./Layout";
import api, { apiUrl } from "../utils/api";
import {
  getInstructor,
  instructorError,
  setInstructorStarted,
} from "../redux/instructorsSlice";
import ImageCropper from "./ImageCropper";
import NiceLayout from "./Layout/NiceLayout";
import DataTable from "../utils/DataTable";
import { Chip, IconButton } from "@mui/material";
import { Delete, Launch } from "@mui/icons-material";
function ManageUsers() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.instructor.instructor);
  const { instructors } = response;
  const { pending } = useSelector((state) => state.instructor);

  const [showUser, setShowUser] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [showAddRecord, setShowAddRecord] = useState(false);

  useEffect(() => {
    dispatch(getInstructor({ success: true, instructors: [] }));

    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setInstructorStarted());
    try {
      const { data } = await api.get(
        `/admin/instructor?page=${currentPage}&keyword=${query}`
      );
      dispatch(getInstructor(data));
    } catch (error) {
      dispatch(instructorError(error.response.data.message));
    }
  };
  const handleDelete = async (row) => {
    try {
      const { data } = await api.delete(
        `/admin/instructor/${row.id}?page=${currentPage}&keyword=${query}`
      );
      fetchData();
    } catch (error) {
      dispatch(instructorError(error.response.data.message));
    }
  };

  const handleShow = (row) => {
    setCurrentUser(row);
    setShowUser(true);
  };

  const columns = [
    { field: "name", headerName: "Fullname", width: 200, flex: 1 },
    //{ field: "username", headerName: "User name", width: 200,},
    {
      field: "email",
      headerName: "Email",
      width: 200,
      style: {
        Width: "4rem",
      },
      flex: 1,
    },
    { field: "phone", headerName: "Phone", width: 200, flex: 1 },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Chip variant="outlined" color="primary" size="small" label={value} />
        );
        return <Button className="btn-sm"> {value}</Button>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color="error" onClick={() => handleDelete(row)}>
              <Delete />
            </IconButton>
            <IconButton color="primary" onClick={() => handleShow(row)}>
              <Launch />
            </IconButton>
          </>
        );
      },
    },
  ];

  const addNew = () => setShowAddRecord(true);
  return (
    <>
      {/* <NiceLayout> */}
      <div style={{ height: "85vh" }}>
        <DataTable
          loading={pending}
          rows={instructors}
          columns={columns}
          onAdd={addNew}
        />
      </div>
      {/* </NiceLayout> */}
      <AddNew
        show={showAddRecord}
        onHide={() => setShowAddRecord(false)}
        onAdded={() => fetchData()}
      />
      <ShowUser
        currentuser={currentUser}
        show={showUser}
        onHide={(e) => setShowUser(false)}
      />
    </>
  );
}

export default ManageUsers;

function ShowUser(props) {
  const { currentuser } = props;
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
        <h2>{currentuser.name}</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className="section profile">
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <div className="">
                <div className="card-body profile-card py-2 border d-flex flex-column align-items-center">
                  <img
                    crossOrigin="anonymous"
                    style={{ width: "100% !important", maxWidth: "100%" }}
                    id="pImg"
                    src={`${apiUrl}/instructor/${currentuser.photo}`}
                    alt="Profile"
                    className="w-100"
                  />
                  <h3 style={{ textTransform: "capitalize" }}></h3>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
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

                  <div className="tab-content pt-2">
                    {OverView(currentuser)}
                  </div>
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
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{user.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Role</div>
        <div className="col-lg-9 col-md-8">{user.role}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Job title</div>
        <div className="col-lg-9 col-md-8">{user.jobTitle}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Description</div>
        <div className="col-lg-9 col-md-8">{user.description}</div>
      </div>
      {/* 
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-9 col-md-8">{user.phone}</div>
      </div>*/}
    </div>
  );
}

function AddNew(props) {
  const dispatch = useDispatch();
  const [instructor, setInstructor] = useState({
    name: "",
    phone: "",
    email: "",
    jobTitle: "",
    description: "",
    photo: "",
  });

  const [error, setError] = useState([]);
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

  const getInput = (e) => {
    let newInput = { ...instructor };
    newInput[e.target.name] = e.target.value;

    setInstructor(newInput);
  };

  const getFile = (e) => {
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));

    setShowImageCropper(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", instructor.name);
    formData.append("phone", instructor.phone);
    formData.append("email", instructor.email);
    formData.append("jobTitle", instructor.jobTitle);
    formData.append("description", instructor.description);
    formData.append("photo", croppedFile);

    dispatch(setInstructorStarted());
    try {
      const { data } = await api.post("/admin/instructor", formData);
      props.onAdded();
      setInstructor({
        name: "",
        phone: "",
        email: "",
        jobTitle: "",
        description: "",
        photo: "",
      });
      setError([]);
      props.onHide();
    } catch (error) {
      setError(error?.response?.data?.message);
      dispatch(instructorError(error?.response?.data?.message.split(",")));
    }
  };
  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-Name-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <h2>Add New instructor</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: "1.5rem" }}>
        <div className=" ">
          <div className="card-body">
            <form className="row g-3">
              <div className="row">
                <div className="col-lg-4">
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
                        height: "12rem",
                        width: "12rem",
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
                      Name
                    </label>
                    <input
                      name="name"
                      value={instructor.name}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={instructor.phone}
                      onChange={getInput}
                      className="form-control"
                      type="tel"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Email
                    </label>
                    <input
                      name="email"
                      value={instructor.email}
                      onChange={getInput}
                      className="form-control"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Job title
                    </label>
                    <input
                      name="jobTitle"
                      value={instructor.jobTitle}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Job title"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={instructor.description}
                      onChange={getInput}
                      className="form-control"
                      placeholder="Description"
                      rows="4"
                      maxLength={150}
                    ></textarea>
                  </div>
                  {/*<div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Position
                    </label>
                    <input
                      name="position"
                      value={instructor.position}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Position"
                    />
                  </div>

                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Qualification
                    </label>
                    <input
                      name="qualification"
                      value={instructor.qualification}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Qualification"
                    />
                  </div>*/}
                </div>
              </div>

              <div className="col-md-12 mb-1">
                <ul>
                  {/* {error?.map((e) => (
                    <li key={e}>
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
      <ImageCropper
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
