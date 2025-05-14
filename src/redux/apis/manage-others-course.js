import api from "../../utils/api";
import {
  getSingleothersCourse as gSU,
  getAllothersCourse,
  othersCourseError,
  getothersCourseStarted,
} from "../othersCourseSlice";

export const getAllOthersCourse = async (dispatch, currentPage, query) => {
  dispatch(getothersCourseStarted());
  try {
    const { data } = await api.get(`/course/others-courses`);
    dispatch(getAllothersCourse(data));
  } catch (error) {
    dispatch(othersCourseError(error.response.data.message));
  }
};

export const deleteOthersCourse = async (OthersCourseId, dispatch) => {
  dispatch(getothersCourseStarted());
  try {
    const { data } = await api.delete("/admin/OthersCourse/" + OthersCourseId);
    await getAllOthersCourse(dispatch);
  } catch (error) {
    dispatch(othersCourseError(error.response.data.message));
  }
};
export const getSingleOthersCourse = async (OthersCourseId, dispatch) => {
  dispatch(getothersCourseStarted());
  try {
    const { data } = await api.get("/admin/OthersCourse/" + OthersCourseId);
    dispatch(gSU(data.OthersCourse));
  } catch (error) {
    dispatch(othersCourseError(error.response.data.message));
  }
};
export const updateOthersCourse = async (
  OthersCourseId,
  credential,
  dispatch,
  onHide
) => {
  dispatch(getothersCourseStarted());
  try {
    const { data } = await api.put(
      "/admin/OthersCourse/" + OthersCourseId,
      credential
    );
    await getAllOthersCourse(dispatch);
    onHide();
  } catch (error) {
    dispatch(othersCourseError(error.response.data.message));
  }
};
export const addOthersCourse = async (credential, dispatch, onHide) => {
  dispatch(getothersCourseStarted());
  try {
    const { data } = await api.post("/admin/OthersCourse", credential);
    await getAllOthersCourse(dispatch);
    onHide();
  } catch (error) {
    dispatch(othersCourseError(error.response.data.message));
  }
};
