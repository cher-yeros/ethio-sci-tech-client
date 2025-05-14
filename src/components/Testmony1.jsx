import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Testmony1() {
  return (
    <OwlCarousel className="owl-theme" loop margin={1} nav>
      <div className="item">
        <div className=" card">
          <img src="assets/images/apparatus.jpg" alt="Course #2" />
          <div className="down-content">
            <h4>Teaching Apparatus Name</h4>
            <h6>
              Price : <strong>100.12 ETB</strong>
            </h6>
            <h6>
              Stock : <strong> 43 piece</strong>
            </h6>
            <p>Description about the apparatus</p>
          </div>
        </div>
      </div>
      <div className="item">
        <div className=" card">
          <img src="assets/images/apparatus.jpg" alt="Course #2" />
          <div className="down-content">
            <h4>Teaching Apparatus Name</h4>
            <h6>
              Price : <strong>100.12 ETB</strong>
            </h6>
            <h6>
              Stock : <strong> 43 piece</strong>
            </h6>
            <p>Description about the apparatus</p>
          </div>
        </div>
      </div>
    </OwlCarousel>
  );
}

export default Testmony1;
