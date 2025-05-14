import React from "react";
import { Link } from "react-router-dom";

function Header({ Search }) {
  return (
    <div className="templatemo-top-nav-container">
      <div className="row">
        <nav className="templatemo-top-nav col-lg-12 col-md-12 w-100">
          <ul className="text-uppercase">
            <li>
              <a href="" className="active">
                Dashboard
              </a>
            </li>

            <li>
              <a href="">My Profile</a>
            </li>
            <li>
              <a href="login.html">Sign in form</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
