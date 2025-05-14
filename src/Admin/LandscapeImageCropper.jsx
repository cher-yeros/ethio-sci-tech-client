import React, { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { Slider } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/CropImage";

function LandscapeImageCropper(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };
  const cropImage = async () => {
    setLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        props.photoUrl,
        croppedAreaPixels,
        rotation
      );

      props.setPhotoUrl(url);
      props.setCroppedFile(file);
      props.onDone();
      //props?.addGallary();

      setLoading(false);
      props.onHide();
      setZoom(1);
      setRotation(0);
    } catch (error) {
      //console.log(error);
      alert("Some error happened!");
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
        <h2>Image cropper</h2>
      </Modal.Header>
      <Modal.Body style={{ height: "17rem" }}>
        <Cropper
          image={props.photoUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={16 / 9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={cropComplete}
        />
      </Modal.Body>
      <Modal.Footer>
        <Form.Label>Zoom {zoomPercent(zoom)} </Form.Label>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
        />
        <Form.Label>Rotation {rotation} deg</Form.Label>

        <Slider
          value={rotation}
          min={0}
          max={360}
          step={1}
          aria-labelledby="Rotation"
          onChange={(e, rotation) => setRotation(rotation)}
        />
        <div
          className="d-flex justify-content-center"
          style={{ columnGap: "1rem" }}
        >
          <Button
            variant="outline-danger"
            onClick={(e) => props.onHide()}
            className="ml-2"
          >
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={cropImage}>
            {loading ? <Spinner animation="border" /> : "Save"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default LandscapeImageCropper;
