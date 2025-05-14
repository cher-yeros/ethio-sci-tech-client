import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

function VideoPlayer(props) {
  const navigate = useNavigate();
  const [videoId, setvideoId] = useState("");
  const { record } = props;
  const link = record.youtubeLink;

  useEffect(() => {
    //alert(link);
    if (link) {
      let pos = link.indexOf("?v=");
      let id = link.substr(pos + 3, link.length - 1);
      setvideoId(id);
    }
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
    autoplay: true,
  };
  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  //alert(videoId);
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
        <Modal.Title id="contained-modal-title-center">
          {record.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: ".2rem", height: "27.84375rem" }}>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <CircularProgress
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  zIndex: "10",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Col>
            <Col lg={12} style={{ padding: "0", zIndex: "20" }}>
              <YouTube
                className="youtube-player"
                videoId={link?.substr(
                  link?.indexOf("?v=") + 3,
                  link?.length - 1
                )}
                opts={opts}
                //loading="Loading"
                onReady={_onReady}
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Link to="youtube" target="_blank">
          <a
            className="btn btn-danger"
            href="https://www.youtube.com/channel/UCT9FnaDTz7EYmHUmGO3PEfw"
            target="_blank"
          >
            Subscribe
          </a>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default VideoPlayer;
