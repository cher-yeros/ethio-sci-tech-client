import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  gallaryError,
  getGallary,
  setGallaryStarted,
} from "../redux/gallarySlice";

import api, { apiUrl } from "../utils/api";
import LandscapeImageCropper from "./LandscapeImageCropper";
import NiceLayout from "./Layout/NiceLayout";

function Gallary() {
  const dispatch = useDispatch();

  const response = useSelector((state) => state.gallary.gallary);
  const { gallaries } = response;

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
    dispatch(setGallaryStarted());
    try {
      const { data } = await api.get("/admin/gallary");
      dispatch(getGallary(data));
    } catch (error) {
      dispatch(gallaryError(error?.response?.data?.message.split(",")));
    }
  };

  const handleDelete = async (row) => {
    dispatch(setGallaryStarted());
    try {
      const { data } = await api.delete("/admin/gallary/" + row);
      fetchData();
    } catch (error) {
      dispatch(gallaryError(error?.response?.data?.message?.split(",")));
    }
  };

  const [image, setImage] = useState("");

  const changeGallary = async (e, teamId) => {
    const formData = new FormData();

    formData.append("photo", e.target.files[0]);

    try {
      const { data } = await api.put("/admin/gallary/" + image, formData);
      //dispatch(getGallary(data));
      fetchData();
    } catch (error) {
      dispatch(gallaryError(error?.response?.data?.message.split(",")));
    }

    var output = document.getElementById(image);
    output.src = URL.createObjectURL(e.target.files[0]);
  };

  const [showImageCropper, setShowImageCropper] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  useEffect(() => {
    //console.log(croppedFile);
    if (croppedFile !== null) {
      addGallary();
    }
  }, [croppedFile]);

  const imageCropDone = (e) => {
    //var output = document.getElementById("photo");
    //output.src = photoUrl;
    //addGallary();
  };

  const getFile = (e) => {
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));

    setShowImageCropper(true);
  };

  const addGallary = async (e) => {
    const formData = new FormData();
    formData.append("photo", croppedFile);

    dispatch(setGallaryStarted());

    try {
      const { data } = await api.post("/admin/gallary", formData);
      setCroppedFile(null);
      fetchData();
      document.getElementById("upload-gallary-image").value = "";
    } catch (error) {
      dispatch(gallaryError(error?.response?.data?.message.split(",")));
    }
  };

  const { pending } = useSelector((state) => state.gallary);

  return (
    <>
      {pending ? (
        <Loading />
      ) : (
        <Container style={{ paddingTop: "1rem" }} fluid>
          <Row style={{ rowGap: "1rem" }} className="mb-3">
            <Col>
              <Button
                onClick={() => {
                  document.getElementById("upload-gallary-image").click();
                }}
                className="btn-sm"
                variant="success"
              >
                Add New
              </Button>
            </Col>
          </Row>
          <Row style={{ rowGap: "1rem" }}>
            {gallaries?.map((gallary) => (
              <Col key={gallary.id} sm={6} md={3} lg={4}>
                <div className="item card">
                  <img
                    id={gallary.id}
                    style={{ width: "100%" }}
                    src={`${apiUrl}/static/gallary/${gallary?.photo}`}
                    alt="Course #2"
                  />
                  <div
                    className="down-content"
                    style={{
                      background: "transparent",
                      paddingTop: ".6rem",
                      paddingBottom: ".6rem",
                    }}
                  >
                    <>
                      <Button
                        onClick={() => handleDelete(gallary.id)}
                        variant="danger"
                        className="btn-sm mx-1"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setImage(gallary.id);
                          document
                            .getElementById("change-gallary-image")
                            .click();
                        }}
                        variant="success"
                        className="btn-sm mx-1"
                      >
                        Change Picture
                      </Button>
                    </>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <input
        onChange={(e) => getFile(e)}
        style={{ display: "none" }}
        type="file"
        name="photo"
        id="upload-gallary-image"
      />
      <input
        onChange={(e) => changeGallary(e)}
        style={{ display: "none" }}
        type="file"
        name="photo"
        id="change-gallary-image"
      />
      <LandscapeImageCropper
        show={showImageCropper}
        onHide={(e) => setShowImageCropper(false)}
        photoUrl={photoUrl}
        setCroppedFile={setCroppedFile}
        setPhotoUrl={setPhotoUrl}
        onDone={imageCropDone}
        addGallary={addGallary}
      />
    </>
  );
}

export default Gallary;
