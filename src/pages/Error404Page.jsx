import React from "react";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <main>
      <div class="container">
        <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2 style={{ marginTop: "3rem" }}>
            The page you are looking for doesn't exist.
          </h2>
          <Link class="btn" to="/">
            Back to home
          </Link>
          <img
            style={{ maxWidth: "32%" }}
            src="images/not-found.svg"
            class="img-fluid py-5"
            alt="Page Not Found"
          />
        </section>
      </div>
    </main>
  );
};

export default Error404Page;
