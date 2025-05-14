import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../redux/apis/auth";
function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async (e) => {
    await userLogout(dispatch, navigate);
    navigate("/");
  };

  const location = useLocation();

  return (
    <>
      <Col lg={6}>
        <h5 style={{ textTransform: "capitalize" }}>
          {location.pathname.replace("/", "").replaceAll("-", " ")}
        </h5>
      </Col>
      <Col lg={6}>
        <nav className="templatemo-top-nav col-lg-12 col-md-12 w-100">
          <ul className="text-uppercase">
            {/*<li>
              <a href="" className="active">
                Dashboard
              </a>
            </li>

            <li>
              <a href="">My Profile</a>
            </li>*/}
            {/*<li>
              <button onClick={logout} className="btn btn-danger btn-sm">
                Logout
              </button>
            </li>*/}
          </ul>
        </nav>
      </Col>
    </>
  );
}

export default Nav;
