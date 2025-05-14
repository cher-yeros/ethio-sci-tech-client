import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  gallaryError,
  getGallary,
  setGallaryStarted,
} from "../redux/gallarySlice";
import api, { apiUrl } from "../utils/api";
import "../utils/css/gallary.css";

function Gallary() {
  const dispatch = useDispatch();
  const images = [
    { src: "course-pic.jpg" },
    { src: "course1-img.jpg" },
    { src: "course2-img.jpg" },
    { src: "course3-img.jpg" },
    { src: "customer-img.jpg" },
    { src: "developer-img.jpg" },
    { src: "events.jpg" },
    { src: "gallery-img1.jpg" },
    { src: "gallery-img10.jpg" },
    { src: "gallery-img11.jpg" },
    { src: "gallery-img12.jpg" },
    { src: "gallery-img2.jpg" },
    { src: "gallery-img3.jpg" },
    { src: "gallery-img4.jpg" },
    { src: "gallery-img5.jpg" },
    { src: "gallery-img6.jpg" },
    { src: "gallery-img7.jpg" },
    { src: "gallery-img8.jpg" },
    { src: "gallery-img9.jpg" },
    { src: "page-banner3.jpg" },
    { src: "photo_2022-07-15_10-37-37.jpg" },
    { src: "team1.jpg" },
    { src: "team2.jpg" },
    { src: "team3.jpg" },
    { src: "team4.jpg" },
    { src: "testimonial-customer.jpg" },
    { src: "travel-img.jpg" },
    { src: "top-college-pic.jpg" },
  ];

  const gallaries = useSelector((state) => state.gallary.gallary.gallaries);

  useEffect(() => {
    fetchGallaries();
  }, []);

  const fetchGallaries = async () => {
    dispatch(setGallaryStarted());
    try {
      const { data } = await api.get("/admin/gallary");
      dispatch(getGallary(data));
    } catch (error) {
      dispatch(gallaryError(error?.response?.data?.message.split(",")));
    }
  };

  return (
    gallaries.length > 0 && (
      <Container className="img-bg" fluid>
        <Row className="pt-3">
          <div className="col-md-12 pb-4">
            <div className="section-heading" style={{ marginBottom: "0" }}>
              <h2 style={{ marginTop: "0" }}>Gallary</h2>
            </div>
          </div>
          <div className="gallary-images">
            {gallaries.map((gallary, i) => (
              <div className="pic" key={gallary.id}>
                <img
                  // src={"images/" + item.src}
                  src={`${apiUrl}/static/gallary/${gallary.photo}`}
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </Row>
      </Container>
    )
  );
}

export default Gallary;
