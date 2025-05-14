import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../redux/apis/auth";
import { GridView } from "@mui/icons-material";
function Sidebar() {
  const openMenu = () => {
    const nav = document.getElementById("templatemo-left-nav");

    nav.classList.contains("active")
      ? nav.classList.remove("active")
      : nav.classList.add("active");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async (e) => {
    await userLogout(dispatch, navigate);
    navigate("/");
  };

  const activate = async (e) => {
    let selector = document.querySelectorAll(".templatemo-left-nav a");

    selector.forEach((nav) => {
      nav.classList.remove("active");
    });

    e.target.classList.add("active");
  };

  return (
    <div className="templatemo-sidebar">
      <header className="templatemo-site-header">
        <h1>Admin Panel</h1>
      </header>

      <div onClick={openMenu} className="mobile-menu-icon">
        <i className="fa fa-bars"></i>
      </div>
      <nav className="templatemo-left-nav" id="templatemo-left-nav">
        <ul style={{ overflow: "auto" }}>
          <li>
            <Link onClick={activate} to="/dashboard" className="active">
              <GridView />
              <i class="bi bi-grid-fill"></i>Dashboard
            </Link>
          </li>

          <li>
            <Link onClick={activate} to="/manage-users">
              <i className="fa fa-users fa-fw"></i>Users
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-courses">
              <i className="fa fa-book fa-fw"></i>
              {/*<i className="fa fa-map-marker fa-fw"></i>*/}
              Courses
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-others-course">
              <i className="fa fa-book fa-fw"></i>
              {/*<i className="fa fa-sliders fa-fw"></i>*/}
              Others Course
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-subjects">
              {/*<i className="fa fa-books fa-fw"></i>*/}
              <i
                className="fas fa-chalkboard-teacher"
                style={{ marginRight: "15px" }}
              ></i>
              {/*<i className="fa fa-users fa-fw"></i>*/}
              Subjects
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-apparatus">
              {/*<i className="fad fa-chalkboard"></i>*/}
              <i
                className="fas fa-chalkboard fa-fw mr-3"
                style={{ marginRight: "15px" }}
              ></i>
              {/*<i className="fa fa-sliders fa-fw"></i>*/}
              Apparatus
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-testimonies">
              {/*<i className="fa fa-sliders fa-fw"></i>*/}
              <i
                className="fas fa-comment-dots"
                style={{ marginRight: "15px" }}
              ></i>
              Testimony
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/orders">
              {/*<i className="fa fa-sliders fa-fw"></i>*/}
              <i
                className="fas fa-luggage-cart"
                style={{ marginRight: "15px" }}
              ></i>
              Order
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-feedbacks">
              <i
                className="far fa-comments"
                style={{ marginRight: "15px" }}
              ></i>
              Feedback
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-projects">
              <i
                className="fas fa-project-diagram"
                style={{ marginRight: "15px" }}
              ></i>
              Projects
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-team">
              <i
                className="fas fa-user-friends"
                style={{ marginRight: "15px" }}
              ></i>
              Team
            </Link>
          </li>

          <li>
            <Link onClick={activate} to="/manage-instructors">
              <i
                className="fas fa-chalkboard-teacher"
                style={{ marginRight: "15px" }}
              ></i>
              Instructors
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-gallary">
              {/*<i class="fas fa-images"></i>*/}
              <i className="fas fa-images" style={{ marginRight: "15px" }}></i>
              Gallary
            </Link>
          </li>
          <li>
            <Link onClick={activate} to="/manage-about-us">
              <i
                className="fas fa-building"
                style={{ marginRight: "15px" }}
              ></i>
              About
            </Link>
          </li>
          <li>
            <a
              onClick={logout}
              style={{
                background: "#dc3545",
                color: "white",
                cursor: "pointer",
              }}
            >
              <i
                className="fas fa-sign-out-alt"
                style={{ marginRight: "15px" }}
              ></i>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
