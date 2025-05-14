import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/apis/auth";
import { Logout } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedIn, currentUser } = useSelector((state) => state.user);
  const [menuOpened, setMenuOpened] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();

    const menuLink = document.getElementById("menu-link");
    const menu = document.getElementById("menu");

    if (menuLink.classList.contains("active")) {
      menuLink.classList.remove("active");
      menu.classList.remove("active");
    } else {
      menuLink.classList.add("active");
      menu.classList.add("active");
    }
  };

  const logout = async (e) => {
    await userLogout(dispatch, navigate);
  };

  const properName = (name) => {
    const iOS = name.indexOf(" ");
    const pName = name.substring(0, iOS) + " " + name.at(iOS + 1) + ".";

    return iOS !== -1 ? pName : name;
  };
  return (
    <header
      className="main-header clearfix"
      role="header"
      //style={{ overflow: "hidden" }}
    >
      <div className="logo" style={{ width: "unset" }}>
        <Link to="/">
          {/*<em>Grad</em> School*/}
          ETHIO-SCITECH
        </Link>
      </div>
      <a onClick={openMenu} id="menu-link" className="menu-link">
        <i className="bi bi-list"></i>
      </a>
      <nav id="menu" className="main-nav" role="navigation">
        <ul className="main-menu">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li className="has-submenu">
            <Link to="#">Apparatus</Link>
            <ul className="sub-menu">
              <li>
                <Link to="/apparatus">Apparatus</Link>
              </li>
              <li>
                <Link to="/equipment">Equipment</Link>
              </li>
            </ul>
          </li>

          <li className="has-submenu">
            <Link to="#">Courses</Link>
            <ul className="sub-menu">
              <li>
                <Link to="/courses">Video courses</Link>
              </li>
              <li>
                <Link to="/kids-course/science-animation">Kids courses</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/instructors">Instructors</Link>
          </li>
          <li className="has-submenu">
            <Link to="#about">About Us</Link>
            <ul className="sub-menu">
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/mission">Mission</Link>
              </li>
              <li>
                <Link to="/vision">Vision</Link>
              </li>
              <li>
                <Link to="/goal">Goal</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
            </ul>
          </li>
          {loggedIn && (
            <li className="has-submenu">
              <Link
                to="#profile"
                // style={{ backgroundColor: "transparent", border: "none" }}
              >
                <img
                  style={{
                    width: "33px",
                    height: "33px",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                  src="images/profile-img.jpg"
                />
                {properName(currentUser.user.name)}
              </Link>
              <ul className="sub-menu border-1">
                <li>
                  <Link to="/my-profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/profile">Upload Video</Link>
                </li>
                <li>
                  <a>
                    <Button
                      startIcon={<Logout />}
                      onClick={logout}
                      variant="contained"
                      color="error"
                      size="small"
                      // to="/mission"
                    >
                      Logout
                    </Button>
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
