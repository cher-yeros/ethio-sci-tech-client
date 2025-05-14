import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateSubject } from "../redux/apis/manage-subject";
import api from "../utils/api";
import NiceLayout from "./Layout/NiceLayout";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function EditSubject(props) {
  //const { record } = props;
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subject.subjects);
  const singleCourse = useSelector((state) => state.course.singleCourse);

  const [subject, setSubject] = useState({
    title: "",
    code: "",
    description: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetchSubject();
    //fetchSubjects();
  }, []);

  const fetchSubject = async () => {
    const { data } = await api.get("/admin/subject/" + id);

    setSubject({
      title: data.subject.title,
      code: "",
      description: data.subject.description,
    });
  };

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const getInput = (e) => {
    let newInput = { ...subject };
    newInput[e.target.name] = e.target.value;

    setSubject(newInput);
  };

  const submit = async (e) => {
    e.preventDefault();

    await updateSubject(
      id,
      subject,
      dispatch,
      setError,
      setSubject,
      setSuccess
    );
  };

  return (
    //<NiceLayout>
    <Container fluid className="my-2">
      <Row>
        <Col lg={8}>
          <div className="card p-3">
            <div className="card-body">
              <form className="row g-3">
                <div className="col-md-12 mb-1">
                  <label className="mb-2" htmlFor="floatingName">
                    Title
                  </label>
                  <input
                    name="title"
                    value={subject.title}
                    onChange={getInput}
                    className="form-control"
                    type="text"
                    placeholder="Title"
                  />
                </div>

                <div className="col-md-12 mb-1">
                  <label className="mb-2" htmlFor="floatingName">
                    Code
                  </label>
                  <input
                    name="code"
                    value={subject.code}
                    onChange={getInput}
                    className="form-control"
                    type="number"
                    placeholder="Code"
                  />
                </div>
                <div className="col-md-12 mb-1">
                  <label className="mb-2" htmlFor="floatingName">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={subject.description}
                    onChange={getInput}
                    className="form-control"
                    placeholder="Description"
                    rows="4"
                  ></textarea>
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

export default EditSubject;
