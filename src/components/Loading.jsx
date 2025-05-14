import { CircularProgress } from "@mui/material";
import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div
      style={{
        height: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ height: "3rem", width: "3rem" }} />
    </div>
  );
  // <Spinner animation="border" variant="primary" />;
}

export default Loading;

export function LoadingButton() {
  return (
    <>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </>
  );
}
