import api from "../../utils/api";
import {
  getsubjectStarted,
  getAllsubject,
  subjectError,
  setSubjectCategory,
} from "../subjectSlice";
export const getAllSubject = async (dispatch) => {
  dispatch(getsubjectStarted());
  try {
    const { data } = await api.get(`/admin/all-subjects`);
    dispatch(getAllsubject(data));
  } catch (error) {
    dispatch(subjectError(error.response.data.message));
  }
};

export const deleteSubject = async (subjectId, dispatch) => {
  dispatch(getsubjectStarted());
  try {
    const { data } = await api.delete("/admin/delete-subject/" + subjectId);
    await getAllSubject(dispatch);
  } catch (error) {
    dispatch(subjectError(error.response.data.message));
  }
};
export const getSingleSubject = async (SubjectId, dispatch) => {
  dispatch(getsubjectStarted());
  try {
    const { data } = await api.get("/admin/Subject/" + SubjectId);
    dispatch(getSingleSubject(data.Subject));
  } catch (error) {
    dispatch(subjectError(error.response.data.message));
  }
};
export const updateSubject = async (
  subjectId,
  subject,
  dispatch,
  setError,
  setSubject,
  setSuccess
) => {
  dispatch(getsubjectStarted());
  try {
    const { data } = await api.put(
      "/admin/update-subject/" + subjectId,
      subject
    );
    await getAllSubject(dispatch);
    //onHide();
    setError([]);
    setSuccess(["Subject updated successfully!"]);
    setSubject({});
    alert("Subject updated successfully!");
  } catch (error) {
    setError(error.response?.data.message.split(","));
    dispatch(subjectError(error.response.data.message));
  }
};
export const addSubject = async (
  subject,
  dispatch,
  onHide,
  setError,
  setSubject,
  setSuccess
) => {
  dispatch(getsubjectStarted());
  try {
    const { data } = await api.post("/admin/add-subject", subject);
    await getAllSubject(dispatch);
    onHide();
    setError([]);
    setSubject({});
    setSuccess(["Subject added successfully!"]);
    alert("Subject added successfully!");
  } catch (error) {
    setError(error.reponse.data.message);
    dispatch(subjectError(error.response.data.message));
  }
};

export const getCategoryByCategory = async (dispatch) => {
  const { data } = await api.get("admin/all-subjects");
};

export const getSubjectByCategory = async (dispatch) => {
  const { data } = await api.get("admin/all-subjects");

  ////console.log(data.subjects);
  let cat = {
    "natural-science": [],
    "science-and-technology": [],
  };
  let cat1 = {
    Natural_Science: [],
    Social_Science: [],
    Science_And_Technology: [],
    History_And_Art: [],
    Miscellaneous: [],
  };

  data.subjects.forEach((subject) => {
    if (subject.category == "natural science") {
      cat1.Natural_Science.push(subject);
    } else if (subject.category == "social science") {
      cat1.Social_Science.push(subject);
    } else if (subject.category == "science and technology") {
      cat1.Science_And_Technology.push(subject);
    } else if (subject.category == "history and art") {
      cat1.History_And_Art.push(subject);
    } else {
      cat1.Miscellaneous.push(subject);
    }
  });

  dispatch(setSubjectCategory(cat1));
};
