import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/apis/manage-user";
import ManageUsers from "./ManageUsers";
import NiceLayout from "./Layout/NiceLayout";
function Users() {
  return (
    //<NiceLayout>
    <ManageUsers />
    //<NiceLayout>
  );
}

export default Users;
