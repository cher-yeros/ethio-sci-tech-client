import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateApparatus } from "../redux/apis/manage-apparatus";
import api, { apiUrl } from "../utils/api";
import NiceLayout from "./Layout/NiceLayout";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function EditApparatus() {
  const dispatch = useDispatch();
  const [apparatus, setApparatus] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    photo: "",
  });

  const { id } = useParams();

  const [error, setError] = useState([]);

  useEffect(() => {
    fetchApparatus();
  }, []);

  const fetchApparatus = async () => {
    //await getAllSubject(dispatch);
    const { data } = await api.get("/apparatus/apparatus/" + id);
    setApparatus({
      name: data.apparatus.name,
      price: data.apparatus.price,
      quantity: data.apparatus.quantity,
      category: data.apparatus.category,
      photo: data.apparatus.photo,
      description: data.apparatus.description,
    });
  };

  const getInput = (e) => {
    let newInput = { ...apparatus };
    newInput[e.target.name] = e.target.value;

    setApparatus(newInput);
  };

  const getFile = async (e) => {
    //let newInput = { ...apparatus };
    //newInput[e.target.name] = e.target.files[0];

    ////console.log(newInput);
    //setApparatus(newInput);

    var output = document.getElementById("photo");
    output.src = URL.createObjectURL(e.target.files[0]);

    const formData = new FormData();
    //console.log(apparatus.photo, id);

    formData.append("photo", e.target.files[0]);
    await updateApparatus(id, formData, dispatch, setError, setApparatus);
    fetchApparatus();
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", apparatus.name);
    formData.append("price", apparatus.price);
    formData.append("quantity", apparatus.quantity);
    formData.append("category", apparatus.category);
    formData.append("description", apparatus.description);

    await updateApparatus(id, formData, dispatch, setError, setApparatus);
    ////console.log(course);
  };

  return (
    //<NiceLayout>
    <Container className="">
      <Row>
        <Col lg={8}>
          <div className="card py-4">
            <div className="card-body">
              <form className="row g-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Select Photo
                      </label>
                      <img
                        crossOrigin="anonymous"
                        id="photo"
                        style={{
                          maxWidth: "100%",
                          margin: "auto",
                          display: "block",
                          border: "3px dotted",
                          minHeight: "12rem",
                        }}
                        src={`${apiUrl}/static/apparatus/${apparatus.photo}`}
                        onClick={() =>
                          document.getElementById("upload-photo").click()
                        }
                        alt={apparatus.name}
                      />

                      <input
                        onChange={getFile}
                        style={{ display: "none" }}
                        type="file"
                        name="photo"
                        id="upload-photo"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Name
                      </label>
                      <input
                        name="name"
                        value={apparatus.name}
                        onChange={getInput}
                        className="form-control"
                        type="text"
                        placeholder="Title"
                      />
                    </div>
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Category
                      </label>
                      <input
                        name="category"
                        value={apparatus.category}
                        onChange={getInput}
                        className="form-control"
                        type="text"
                        placeholder="Category"
                      />
                    </div>

                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Price (ETB)
                      </label>
                      <input
                        name="price"
                        value={apparatus.price}
                        onChange={getInput}
                        className="form-control"
                        type="number"
                        placeholder="Price"
                      />
                    </div>
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Quantity
                      </label>
                      <input
                        name="quantity"
                        value={apparatus.quantity}
                        onChange={getInput}
                        className="form-control"
                        type="number"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="col-md-12 mb-1">
                      <label className="mb-2" htmlFor="floatingName">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={apparatus.description}
                        onChange={getInput}
                        className="form-control"
                        placeholder="Description"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-1">
                  <ul>
                    {error?.map((e) => (
                      <li>
                        <Alert
                          //className="mx-1"
                          style={{ padding: ".4rem", margin: ".2rem" }}
                          key={e}
                          variant="danger"
                        >
                          {e}
                        </Alert>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-12 mb-1">
                  <div className="text-center">
                    <div className="text-center">
                      <button
                        onClick={submit}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    //<NiceLayout>
  );
}

export default EditApparatus;
