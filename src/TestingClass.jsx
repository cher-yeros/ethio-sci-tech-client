import React from "react";
import "./utils/css/team.css";
import "./utils/css/gallary.css";

function TestingClass() {
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
  return (
    <>
      <div className="gallary-images">
        {images.map((item, i) => (
          <div className="pic" key={item.src}>
            <img
              src={"images/" + item.src}
              alt={item.src}
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default TestingClass;
