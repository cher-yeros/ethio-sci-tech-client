import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="templatemo-flex-row">
      <Sidebar />
      <div
        className="templatemo-content col-1 light-gray-bg w-100"
        style={{ width: "100%" }}
      >
        <div
          className="templatemo-top-nav-container"
          style={{ padding: "1rem 1rem" }}
        >
          <div className="row">
            <Nav />
          </div>
        </div>

        <Container fluid style={{ height: "100%" }}>
          <div
            style={{ height: "100%" }}
            className="panel panel-default table-responsive"
          >
            {/* {children} */}
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Layout;
