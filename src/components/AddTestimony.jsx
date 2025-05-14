import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { feedbackError, getfeedbackStarted } from "../redux/feedbackSlice";
import { gettestimonyStarted, testimonyError } from "../redux/testimonySlice";
import api from "../utils/api";
function AddTestimony() {
  const dispatch = useDispatch();
  const { currentUser, loggedIn } = useSelector((state) => state.user);
  const [testimony, setTestimony] = useState({
    name: "",
    role: "",
    description: "",
  });
  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...testimony };
    newInput[e.target.name] = e.target.value;

    setTestimony(newInput);
  };

  const submit = async (e) => {
    e.preventDefault();

    const test = {
      user: {
        id: loggedIn ? currentUser.user.id : null,
        name: loggedIn ? currentUser.user.name : null,
      },
      name: testimony.name,
      role: testimony.role,
      description: testimony.description,
    };

    //console.log(test);
    dispatch(gettestimonyStarted());

    try {
      const { data } = await api.post("/testimony/add-testimony", test);
      setError([]);
      alert("Your testimony has been submitted successfully!");
      setTestimony({
        user: loggedIn ? currentUser.id : null,
        name: "",
        role: "",
        description: "",
      });
    } catch (error) {
      setError(error?.response?.data?.message?.split(","));
      dispatch(testimonyError(error?.response?.data?.message?.split(",")));
    }
  };
  return (
    <form id="contact" action="" method="post">
      <header className="mb-4">
        <h2 style={{ color: "whitesmoke" }}>Add Testimony</h2>
      </header>
      <div className="row">
        <div className="col-md-6">
          <fieldset>
            <input
              name="name"
              value={testimony.name}
              onChange={getInput}
              type="text"
              className="form-control"
              id="name11"
              placeholder="Your Name"
              required=""
            />
          </fieldset>
        </div>
        <div className="col-md-6">
          <fieldset>
            <input
              name="role"
              value={testimony.role}
              onChange={getInput}
              type="text"
              className="form-control"
              id="role"
              placeholder="Your Role"
              required=""
            />
          </fieldset>
        </div>
        <div className="col-md-12">
          <fieldset>
            <textarea
              name="description"
              value={testimony.description}
              onChange={getInput}
              rows={4}
              //rows="4"
              className="form-control"
              id="message1"
              placeholder="Your testimony..."
              required=""
            ></textarea>
          </fieldset>
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
        <div className="col-md-12">
          <fieldset>
            <button
              onClick={submit}
              type="submit"
              id="form-submi"
              className="button"
            >
              Send Testimony Now
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default AddTestimony;
