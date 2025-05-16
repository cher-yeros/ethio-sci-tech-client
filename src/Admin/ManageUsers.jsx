import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUser } from "../redux/apis/manage-user";

import { Delete, Launch } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import DataTable from "../utils/DataTable";

function ManageUsers() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.users.users);
  const { users } = response;
  const { pending } = useSelector((state) => state.users);

  const [showUser, setShowUser] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllUser(dispatch, currentPage, query);
  };
  const handleDelete = async (row) => {
    await deleteUser(row.id, dispatch);
    fetchData();
  };

  const handleShow = (row) => {
    //console.log(row);
    setCurrentUser(row);
    setShowUser(true);
  };

  const columns = [
    //{ field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Fullname", width: 170, flex: 1.5 },
    { field: "username", headerName: "User name", width: 150, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      flex: 1.3,
    },
    { field: "phone", headerName: "Phone", width: 150, flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 0.8,
      renderCell: ({ value, row }) => {
        return (
          <Chip variant="outlined" color="primary" size="small" label={value} />
        );
        return <Button className="btn-sm"> {value}</Button>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ value, row }) => {
        return (
          <>
            <IconButton color="error" onClick={() => handleDelete(row)}>
              <Delete />
            </IconButton>
            <IconButton color="primary" onClick={() => handleShow(row)}>
              <Launch />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      {/*{pending ? (
        <Loading />
      ) : (*/}
      <div style={{ height: "85vh" }}>
        <DataTable loading={pending} rows={users} columns={columns} />
      </div>
      {/*)}*/}

      <ShowUser
        currentuser={currentUser}
        show={showUser}
        onHide={(e) => setShowUser(false)}
      />
    </>
  );
}

export default ManageUsers;

function ShowUser(props) {
  const { currentuser } = props;
  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="add-product-modal"
    >
      <Modal.Header closeButton>
        <h2>{currentuser.name}</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className="section profile">
          <div className="row">
            <div className="col-xl-3 col-lg-3">
              <div className="">
                <div className="card-body profile-card py-2 border d-flex flex-column align-items-center">
                  <img
                    crossOrigin="anonymous"
                    style={{ width: "100% !important", maxWidth: "100%" }}
                    id="pImg"
                    src="assets/images/default-user.jpg"
                    //src={`https://www.bing.com/images/search?view=detailV2&ccid=LSFwRbLu&id=68785F479305ACFEC9C0A47B2F18801F57199E6C&thid=OIP.LSFwRbLuXsFjvFe021k0LQHaHC&mediaurl=https%3a%2f%2fi.imgur.com%2fOD9XEljl.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.2d217045b2ee5ec163bc57b4db59342d%3frik%3dbJ4ZVx%252bAGC97pA%26pid%3dImgRaw%26r%3d0%26sres%3d1%26sresct%3d1%26srh%3d800%26srw%3d842&exph=475&expw=500&q=profile&simid=608023951985284612&FORM=IRPRST&ck=0329EAAD82BE619DFBC3001140A6D7F8&selectedIndex=39`}
                    alt="Profile"
                    className="w-100"
                  />
                  {/*<h4>Yerosen Diriba</h4>*/}
                  <h3 style={{ textTransform: "capitalize" }}></h3>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9">
              <div className=" border ">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                        style={{ fontSize: ".9rem" }}
                      >
                        Profile Details
                      </button>
                    </li>

                    {/*<li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>*/}

                    {/*<li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>*/}
                  </ul>

                  <div className="tab-content pt-2">
                    {OverView(currentuser)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function OverView(user) {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      {/*<h5 className="card-title">Profile Details</h5>*/}

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Full Name</div>
        <div className="col-lg-9 col-md-8">{user.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Username</div>
        <div className="col-lg-9 col-md-8">{user.username}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-9 col-md-8">{user.email}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-9 col-md-8">{user.phone}</div>
      </div>
      {/*
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{user.address}</div>
      </div>*/}
    </div>
  );
}
