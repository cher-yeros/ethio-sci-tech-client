import api from "../../utils/api";
import {
  getSingleCourse as gSU,
  courseError,
  getcourseStarted,
  getAllcourse,
  setCourseBySubject,
  getAllkidsCourse,
} from "../courseSlice";

export const getAllCourse = async (dispatch, currentPage, query) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.get(
      `/course/courses?page=${currentPage}&query=${query}`
    );
    dispatch(getAllcourse(data));
  } catch (error) {
    dispatch(courseError(error.response.data.message));
  }
};
export const getAllKidsCourse = async (dispatch, currentPage, query) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.get(
      `/course/kids-courses?page=${currentPage}&query=${query}`
    );
    dispatch(getAllkidsCourse(data));
  } catch (error) {
    dispatch(courseError(error.response.data.message));
  }
};

export const getCourseBySubject = async (
  dispatch,
  subject,
  currentPage,
  query
) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.get(
      `/course/courses/${subject}?page=${currentPage}&query=${query}`
    );
    dispatch(setCourseBySubject(data.courses));
    dispatch(getAllcourse(data));
  } catch (error) {
    dispatch(courseError(error.response.data.message));
  }
};
export const getCategoryByKids = async (
  dispatch,
  subject,
  currentPage,
  query
) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.get(
      `/course/kids-courses/${subject}?page=${currentPage}&query=${query}`
    );
    dispatch(setCourseBySubject(data.courses));
    dispatch(getAllcourse(data));
  } catch (error) {
    dispatch(courseError(error.response.data.message));
  }
};

export const deleteCourse = async (CourseId, dispatch) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.delete("/course/course/" + CourseId);
    await getAllCourse(dispatch);
  } catch (error) {
    dispatch(courseError(error.response.data.message));
  }
};
export const getSingleCourse = async (courseId, dispatch) => {
  dispatch(getcourseStarted());
  try {
    //console.log(courseId);
    const { data } = await api.get("/course/course/" + courseId);
    //console.log(data);
    dispatch(gSU(data.course));
  } catch (error) {
    dispatch(courseError(error.response.data.message));
  }
};
export const updateCourse = async (
  courseId,
  course,
  dispatch,
  setSuccess,
  setError,
  setCourse
) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.put("/course/course/" + courseId, course);
    await getAllCourse(dispatch);
    setError([]);
    //setCourse({});
    //setSuccess(["Successfully Updated!"]);
    alert("Course successfully Updated!");
  } catch (error) {
    //console.log(error);
    setError(error.response?.data.message.split(","));
    dispatch(courseError(error.response?.data.message));
  }
};

export const addCourse = async (
  course,
  dispatch,
  onHide,
  setError,
  setCourse
) => {
  dispatch(getcourseStarted());
  try {
    const { data } = await api.post("/course/add-course", course);
    await getAllCourse(dispatch);
    setError([]);
    setCourse({});
    onHide();
  } catch (error) {
    setError(error.response.data.message);
    dispatch(courseError(error.response.data.message));
  }
};
