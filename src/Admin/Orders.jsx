import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { getAllOrder, makeSold } from "../redux/apis/manage-orders";
import { getSingleCourse } from "../redux/courseSlice";
import { apiUrl } from "../utils/api";
import DataTable from "../utils/DataTable";
import NiceLayout from "./Layout/NiceLayout";
import { Check, CheckCircle, Launch } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Orders() {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.order.order);
  const { orders } = response;

  const [showRecord, setShowRecord] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [ShowEditRecord, setShowEditRecord] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getAllOrder(dispatch, currentPage, query);
  };

  const handleSold = async (row) => {
    await makeSold(row.id, dispatch);
    //fetchData();
  };

  const handleShow = (row) => {
    setCurrentRecord(row);
    setShowRecord(true);
  };

  const handleEdit = async (row) => {
    //console.log(row);
    dispatch(getSingleCourse(row));
    setCurrentRecord(row);
    setShowEditRecord(true);
  };

  const columns = [
    {
      field: "user.id.name",
      headerName: "User",
      width: 200,
      flex: 1,
      renderCell: ({ row }) => {
        return row?.User?.name;
      },
    },
    //{ field: "quantity", headerName: "Quantity", sort: true },
    {
      field: "apparatus.name",
      headerName: "Apparatus",
      width: 200,
      flex: 1,
      renderCell: ({ row }) => {
        return row?.Apparatu?.name;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      flex: 1,
      renderCell: ({ value }) => {
        return moment(value).format("MMM Do, YYYY");
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color="success" onClick={() => handleSold(row)}>
              <CheckCircle />
            </IconButton>

            <IconButton color="primary" onClick={() => handleShow(row)}>
              <Launch />
            </IconButton>
          </>
        );
      },
    },
  ];

  const { pending } = useSelector((state) => state.order);

  return (
    <>
      <div style={{ height: "85vh" }}>
        <DataTable
          loading={pending}
          rows={orders}
          columns={columns}
          //onAdd={onAddNew}
        />
      </div>
      <ShowRecordDetail
        show={showRecord}
        record={currentRecord}
        onHide={(e) => setShowRecord(false)}
      />
    </>
  );
}

export default Orders;

function ShowRecordDetail(props) {
  const { record } = props;

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
        <h2>Order Detail</h2>
      </Modal.Header>
      <Modal.Body style={{ padding: ".3rem" }}>
        <div className="section profile">
          <div className="row">
            <div className="-9 col-lg-6">
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
                        Apparatus Details
                      </button>
                    </li>

                    {/*<li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#user-detail"
                      >
                        User Detail
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

                  <div className="tab-content pt-2">{OverView(record)}</div>
                  {/*<div className="tab-content pt-2">{UserDetail(record)}</div>*/}
                </div>
              </div>
            </div>
            <div className="-3 col-lg-6">
              <div className="">
                <div className="card-body profile-card py-2 border d-flex flex-column align-items-center">
                  {/*<label htmlFor="">Apparatus Image</label>*/}
                  <img
                    crossOrigin="anonymous"
                    style={{ width: "100% !important", maxWidth: "100%" }}
                    id="pImg"
                    src={`${apiUrl}/static/apparatus/${record?.Apparatu?.photo}`}
                    //src={`https://www.bing.com/images/search?view=detailV2&ccid=LSFwRbLu&id=68785F479305ACFEC9C0A47B2F18801F57199E6C&thid=OIP.LSFwRbLuXsFjvFe021k0LQHaHC&mediaurl=https%3a%2f%2fi.imgur.com%2fOD9XEljl.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.2d217045b2ee5ec163bc57b4db59342d%3frik%3dbJ4ZVx%252bAGC97pA%26pid%3dImgRaw%26r%3d0%26sres%3d1%26sresct%3d1%26srh%3d800%26srw%3d842&exph=475&expw=500&q=profile&simid=608023951985284612&FORM=IRPRST&ck=0329EAAD82BE619DFBC3001140A6D7F8&selectedIndex=39`}
                    alt="Profile"
                    className="w-100"
                  />
                  {/*<h4>Yerosen Diriba</h4>*/}
                  <h3 style={{ textTransform: "capitalize" }}></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      {/*<Modal.Footer>
        <Button onClick={() => props.onHide()}>Close</Button>
      </Modal.Footer>*/}
    </Modal>
  );
}

function OverView(record) {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="user-detail"
    >
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{record?.Apparatu?.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Category</div>
        <div className="col-lg-9 col-md-8">{record?.Apparatu?.category}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Quantity</div>
        <div className="col-lg-9 col-md-8">{record?.Apparatu?.quantity}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Price</div>
        <div className="col-lg-9 col-md-8">{record?.Apparatu?.price} ETB</div>
      </div>

      <ul className="nav nav-tabs nav-tabs-bordered mb-3">
        <li className="nav-item">
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#user-detail"
            style={{ fontSize: ".9rem", color: "#4154f1" }}
          >
            User Detail
          </button>
        </li>
      </ul>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{record?.User?.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Username</div>
        <div className="col-lg-9 col-md-8">{record?.User?.username}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-9 col-md-8">{record?.User?.email}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-9 col-md-8">{record?.User?.phone} </div>
      </div>
    </div>
  );
}

function UserDetail(user) {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{user?.name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Category</div>
        <div className="col-lg-9 col-md-8">{user?.category}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Quantity</div>
        <div className="col-lg-9 col-md-8">{user?.quantity}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Price</div>
        <div className="col-lg-9 col-md-8">{user?.price} ETB</div>
      </div>
      {/*
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{user?.address}</div>
      </div>*/}
    </div>
  );
}
