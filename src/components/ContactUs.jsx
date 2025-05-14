import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { feedbackError, getfeedbackStarted } from "../redux/feedbackSlice";
import api from "../utils/api";
function ContactUs() {
  const dispatch = useDispatch();
  const { currentUser, loggedIn } = useSelector((state) => state.user);
  const [feedback, setFeedback] = useState({
    user: loggedIn ? currentUser.user.id : null,
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState([]);

  const getInput = (e) => {
    let newInput = { ...feedback };
    newInput[e.target.name] = e.target.value;

    setFeedback(newInput);
  };

  const submit = async (e) => {
    e.preventDefault();

    dispatch(getfeedbackStarted());

    try {
      const { data } = await api.post("/feedback/add-feedback", feedback);
      setError([]);
      alert("Your feedback has been submitted successfully!");
      setFeedback({
        user: loggedIn ? currentUser.user.id : null,
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setError(error?.response?.data?.message?.split(","));
      dispatch(feedbackError(error?.response?.data?.message?.split(",")));
    }
  };
  return (
    <form id="contact" action="" method="post">
      <header className="mb-4">
        <h2 style={{ color: "whitesmoke" }}>Contact us</h2>
      </header>
      <div className="row">
        <div className="col-md-6">
          <fieldset>
            <input
              name="name"
              value={feedback.name}
              onChange={getInput}
              type="text"
              className="form-control"
              id="name"
              placeholder="Your Name"
              required=""
            />
          </fieldset>
        </div>
        <div className="col-md-6">
          <fieldset>
            <input
              name="email"
              value={feedback.email}
              onChange={getInput}
              type="email"
              className="form-control"
              id="email"
              placeholder="Your Email"
              required=""
            />
          </fieldset>
        </div>
        <div className="col-md-12">
          <fieldset>
            <textarea
              name="message"
              value={feedback.message}
              onChange={getInput}
              rows={4}
              className="form-control"
              id="message"
              placeholder="Your message..."
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
              id="form-submit0"
              className="button"
            >
              Send Message Now
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default ContactUs;
