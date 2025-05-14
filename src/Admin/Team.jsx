import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {
  addTeam,
  getTeam,
  setTeamStarted,
  teamError,
} from "../redux/teamSclice";
import api, { apiUrl } from "../utils/api";
import ImageCropper from "./ImageCropper";
import NiceLayout from "./Layout/NiceLayout";

function Team() {
  const dispatch = useDispatch();

  const response = useSelector((state) => state.team.team);
  const { teams } = response;

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
    dispatch(setTeamStarted());
    try {
      const { data } = await api.get("/admin/team");
      dispatch(getTeam(data));
    } catch (error) {
      dispatch(teamError(error?.response?.data?.message.split(",")));
    }
  };

  const handleDelete = async (row) => {
    dispatch(setTeamStarted());
    try {
      const { data } = await api.delete("/admin/team/" + row);
      dispatch(getTeam(data));
      fetchData();
    } catch (error) {
      dispatch(teamError(error?.response?.data?.message.split(",")));
    }
  };

  const handleEdit = async (e, team) => {
    setCurrentRecord(team);
    setShowEditRecord(true);
  };

  const [image, setImage] = useState("");

  const getFile = async (e, teamId) => {
    const formData = new FormData();

    formData.append("photo", e.target.files[0]);

    try {
      const { data } = await api.put("/admin/team/" + image, formData);
    } catch (error) {
      dispatch(teamError(error?.response?.data?.message.split(",")));
    }

    var output = document.getElementById(image);
    output.src = URL.createObjectURL(e.target.files[0]);
  };

  const { pending } = useSelector((state) => state.team);

  return (
    <>
      {pending ? (
        <Loading />
      ) : (
        <Container style={{ paddingTop: "1rem" }} fluid>
          <Row style={{ rowGap: "1rem" }} className="mb-3">
            <Col>
              <Button
                onClick={() => setShowAddRecord(true)}
                className="btn-sm"
                variant="success"
              >
                Add New
              </Button>
            </Col>
          </Row>
          <Row style={{ rowGap: "1rem" }}>
            {teams.map((team) => (
              <Col key={team.id} sm={6} md={4} lg={6}>
                <div className="item card" style={{ minHeight: "11rem" }}>
                  <Row>
                    <Col lg={5}>
                      <img
                        id={team.id}
                        style={{ width: "100%" }}
                        src={`${apiUrl}/static/team/${team?.photo}`}
                        alt="Course #2"
                      />
                    </Col>
                    <Col lg={7}>
                      <div
                        className="down-content"
                        style={{
                          background: "transparent",
                          paddingTop: ".6rem",
                        }}
                      >
                        <h5>
                          <strong>Name : </strong> {team?.name}
                          {/* {pending ? (
                            <>
                              <strong>Name : </strong> {team?.name}
                            </>
                          ) : (
                            <Skeleton />
                          )} */}
                        </h5>
                        <h6>
                          <strong>Position : </strong>
                          {team?.position}
                        </h6>
                        <h6>
                          <strong>Qualification : </strong>
                          {team?.qualification}
                        </h6>
                        <input
                          onChange={(e) => getFile(e, team.id)}
                          style={{ display: "none" }}
                          type="file"
                          name="photo"
                          id="upload-team-image"
                        />
                        <>
                          <Button
                            onClick={() => handleDelete(team.id)}
                            variant="danger"
                            className="btn-sm mx-1"
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => {
                              setImage(team.id);
                              document
                                .getElementById("upload-team-image")
                                .click();
                            }}
                            variant="success"
                            className="btn-sm mx-1"
                          >
                            Change Picture
                          </Button>
                          <Button
                            onClick={(e) => handleEdit(e, team)}
                            variant="success"
                            className="btn-sm mx-1"
                          >
                            Edit
                          </Button>
                        </>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <AddNew
        show={showAddRecord}
        onHide={() => setShowAddRecord(false)}
        onAdded={() => fetchData()}
      />

      <EditTeam
        show={ShowEditRecord}
        onHide={() => setShowEditRecord(false)}
        onAdded={() => fetchData()}
        record={currentRecord}
      />
    </>
  );
}

export default Team;

function AddNew(props) {
  const dispatch = useDispatch();
  const [team, setTeam] = useState({
    name: "",
    position: "",
    qualification: "",
    photo: "",
  });

  const [showImageCropper, setShowImageCropper] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...team };
    newInput[e.target.name] = e.target.value;

    setTeam(newInput);
  };

  const getFile = (e) => {
    let newInput = { ...team };
    newInput[e.target.name] = e.target.files[0];

    setTeam(newInput);

    var output = document.getElementById("photo");
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));

    setShowImageCropper(true);
  };

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

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", team.name);
    formData.append("position", team.position);
    formData.append("qualification", team.qualification);
    formData.append("photo", croppedFile);

    dispatch(setTeamStarted());
    try {
      const { data } = await api.post("/admin/team", formData);
      props.onAdded();
      props.onHide();

      setTeam({
        name: "",
        position: "",
        qualification: "",
        photo: "",
      });
      data.success && dispatch(addTeam(data.team));
    } catch (error) {
      setError(error?.response?.data?.message);
      dispatch(teamError(error?.response?.data?.message));
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
        <h2>Add New team</h2>
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
                      value={team.name}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Position
                    </label>
                    <input
                      name="position"
                      value={team.position}
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
                      value={team.qualification}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Qualification"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 mb-1">
                <ul>
                  {error?.map((e) => (
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

function EditTeam(props) {
  const dispatch = useDispatch();

  const { record } = props;

  const [team, setTeam] = useState({
    name: props.record.name,
    position: props.record.position,
    qualification: props.record.qualification,
  });

  useEffect(() => {
    setTeam({
      name: props.record.name,
      position: props.record.position,
      qualification: props.record.qualification,
    });
  }, [props.record]);

  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...team };
    newInput[e.target.name] = e.target.value;

    setTeam(newInput);
  };

  const getFile = (e) => {
    let newInput = { ...team };
    newInput[e.target.name] = e.target.files[0];

    setTeam(newInput);

    var output = document.getElementById("photo");
    output.src = URL.createObjectURL(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", team.name);
    formData.append("position", team.position);
    formData.append("qualification", team.qualification);
    formData.append("photo", team.photo);

    dispatch(setTeamStarted());
    try {
      const { data } = await api.put("/admin/team/" + props.record.id, team);
      props.onAdded();
      props.onHide();
      setTeam({
        name: "",
        position: "",
        qualification: "",
        photo: "",
      });
      data.success && dispatch(addTeam(data.team));
    } catch (error) {
      dispatch(teamError(error?.response?.data?.message.split(",")));
    }
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
        <h2>{team.name}</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: "1.5rem" }}>
        <div className=" ">
          <div className="card-body">
            <form className="row g-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Name
                    </label>
                    <input
                      name="name"
                      value={team.name}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-md-12 mb-1">
                    <label className="mb-2" htmlFor="floatingName">
                      Position
                    </label>
                    <input
                      name="position"
                      value={team.position}
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
                      value={team.qualification}
                      onChange={getInput}
                      className="form-control"
                      type="text"
                      placeholder="Qualification"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 mb-1">
                <ul>
                  {error?.map((e) => (
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
    </Modal>
  );
}
