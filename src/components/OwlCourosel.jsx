import React from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./owl.css";

function OwlCourosel() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row title" style={{ marginBottom: "20px" }}>
          <div className="col-sm-12 btn btn-info">
            Owl Carousel In React Application
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <OwlCarousel items={3} className="owl-theme" loop nav margin={8}>
          <div>
            <img className="img" src="assets/images/main-slider-01.jpg" />
          </div>
          <div>
            <img className="img" src="assets/images/main-slider-02.jpg" />
          </div>
          <div>
            <img className="img" src="assets/images/main-slider-03.jpg" />
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
}

export default OwlCourosel;
