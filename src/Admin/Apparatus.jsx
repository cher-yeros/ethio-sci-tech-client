import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  addApparatus,
  deleteApparatus,
  getAllApparatuss,
} from "../redux/apis/manage-apparatus";
import { updateCourse } from "../redux/apis/manage-course";
import { getSingleCourse } from "../redux/courseSlice";
import { apiUrl } from "../utils/api";
import DataTable from "../utils/DataTable";
import LandscapeImageCropper from "./LandscapeImageCropper";
import NiceLayout from "./Layout/NiceLayout";
import moment from "moment";
import Compressor from "compressorjs";
import { IconButton } from "@mui/material";
import { BorderColor, Delete, Launch } from "@mui/icons-material";

function Apparatus() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.apparatus.apparatus);
  const { apparatuses } = response;

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
    await getAllApparatuss(dispatch, currentPage, query);
  };

  const handleDelete = async (row) => {
    await deleteApparatus(row.id, dispatch);
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

  const columns = [
    { field: "name", headerName: "Name", width: 250, flex: 1.5 },
    //{ field: "category", headerName: "Category",  },
    { field: "quantity", headerName: "Quantity", width: 100, flex: 1 },
    { field: "price", headerName: "Price", width: 100, flex: 1 },
    { field: "type", headerName: "Type", width: 200, flex: 1 },
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
      width: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color="error" onClick={() => handleDelete(row)}>
              <Delete />
            </IconButton>
            <Link state={row} to={`/edit-apparatus/${row.id}`}>
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

  const { pending } = useSelector((state) => state.apparatus);

  return (
    <>
      {/* <NiceLayout> */}
      <div style={{ height: "85vh" }}>
        <DataTable
          loading={pending}
          rows={apparatuses}
          columns={columns}
          onAdd={onAddNew}
        />
      </div>
      {/* <NiceLayout> */}
      <ShowRecordDetail
        record={currentRecord}
        show={showRecord}
        onHide={() => setShowRecord(false)}
      />
      <AddNew show={showAddRecord} onHide={() => setShowAddRecord(false)} />
    </>
  );
}

export default Apparatus;

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
        <h2>Show Apparatus</h2>
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
                        Apparatus Details
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
                    src={`${apiUrl}/static/apparatus/${record.photo}`}
                    alt="Profile"
                    className="w-100"
                  />
                  <h3 style={{ headerNameTransform: "capitalize" }}></h3>
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
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{user.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Category</div>
        <div className="col-lg-9 col-md-8">{user.category}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Quantity</div>
        <div className="col-lg-9 col-md-8">{user.quantity}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Price</div>
        <div className="col-lg-9 col-md-8">{user.price} ETB</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Description</div>
        <div className="col-lg-9 col-md-8">{user.description}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Type</div>
        <div className="col-lg-9 col-md-8">{user.type}</div>
      </div>
    </div>
  );
}

function AddNew(props) {
  const dispatch = useDispatch();

  const [apparatus, setApparatus] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    type: "apparautus",
    photo: "",
    description: "",
  });

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
    // new Compressor(e.target.files[0], {
    //   quality: 0.8,
    //   success: (compressedResult) => {
    //     setPhotoUrl(URL.createObjectURL(compressedResult));

    //     setShowImageCropper(true);
    //   },
    // });
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    setShowImageCropper(true);
  };

  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...apparatus };
    newInput[e.target.name] = e.target.value;

    setApparatus(newInput);
  };

  //const getFile = (e) => {
  //  let newInput = { ...apparatus };
  //  newInput[e.target.name] = e.target.files[0];

  //  //console.log(newInput);
  //  setApparatus(newInput);

  //  var output = document.getElementById("photo");
  //  output.src = URL.createObjectURL(e.target.files[0]);
  //};

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", apparatus.name);
    formData.append("price", apparatus.price);
    formData.append("quantity", apparatus.quantity);
    formData.append("category", apparatus.category);
    formData.append("photo", croppedFile);
    formData.append("description", apparatus.description);
    formData.append("type", apparatus.type);

    await addApparatus(
      formData,
      dispatch,
      props.onHide,
      setError,
      setApparatus
    );

    setApparatus({
      name: "",
      price: "",
      quantity: "",
      category: "",
      photo: "",
      description: "",
    });
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
        <h2>Add New Apparatus</h2>
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
                        height: "14rem",
                        width: "24.888rem",
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
                      value={apparatus.name}
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
                    <input
                      name="category"
                      value={apparatus.category}
                      onChange={getInput}
                      className="form-control"
                      type="headerName"
                      placeholder="Category"
                    />
                  </div>

                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Price (ETB)
                    </label>
                    <input
                      name="price"
                      value={apparatus.price}
                      onChange={getInput}
                      className="form-control"
                      type="number"
                      placeholder="Price"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Quantity
                    </label>
                    <input
                      name="quantity"
                      value={apparatus.quantity}
                      onChange={getInput}
                      className="form-control"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Select type
                    </label>
                    <select
                      name="type"
                      value={apparatus.type}
                      onChange={getInput}
                      className="form-select"
                      placeholder="Select type"
                    >
                      <option value="apparatus">Apparatus</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={apparatus.description}
                      onChange={getInput}
                      className="form-control"
                      placeholder="Description"
                      rows="4"
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
function EditCourse(props) {
  const dispatch = useDispatch();
  const singleCourse = useSelector((state) => state.course.singleCourse);
  const subjects = useSelector((state) => state.subject.subject.subjects);

  useEffect(() => {
    //fetchSubjects();
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
    //await getAllSubject(dispatch);
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
