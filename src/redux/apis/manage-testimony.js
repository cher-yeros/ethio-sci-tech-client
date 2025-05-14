import api from "../../utils/api";
import {
  getAlltestimony,
  gettestimonyStarted,
  testimonyError,
  getSingletestimony as gSU,
  getApprovedTestimonies,
} from "../testimonySlice";
//import {
//  getAllTestimonys,
//  gettestimonyStarted,
//  testimonyError,
//  getSingleTestimony as gSU,
//} from "../testimonySlice";
export const getAllTestimony = async (dispatch, currentPage, query) => {
  dispatch(gettestimonyStarted());
  try {
    const { data } = await api.get(
      `/testimony/all-testimonies?page=${currentPage}&keyword=${query}`
    );
    dispatch(getAlltestimony(data));
  } catch (error) {
    dispatch(testimonyError(error.response.data.message));
  }
};

export const deleteTestimony = async (TestimonyId, dispatch) => {
  dispatch(gettestimonyStarted());
  try {
    const { data } = await api.delete("/admin/Testimony/" + TestimonyId);
    await getAllTestimony(dispatch);
  } catch (error) {
    dispatch(testimonyError(error.response.data.message));
  }
};
export const getSingleTestimony = async (TestimonyId, dispatch) => {
  dispatch(gettestimonyStarted());
  try {
    const { data } = await api.get("/admin/Testimony/" + TestimonyId);
    dispatch(gSU(data.Testimony));
  } catch (error) {
    dispatch(testimonyError(error.response.data.message));
  }
};
export const updateTestimony = async (
  TestimonyId,
  credential,
  dispatch,
  onHide
) => {
  dispatch(gettestimonyStarted());
  try {
    const { data } = await api.put(
      "/admin/Testimony/" + TestimonyId,
      credential
    );
    await getAllTestimony(dispatch);
    onHide();
  } catch (error) {
    dispatch(testimonyError(error.response.data.message));
  }
};
export const addTestimony = async (credential, dispatch, onHide) => {
  dispatch(gettestimonyStarted());
  try {
    const { data } = await api.post("/admin/Testimony", credential);
    await getAllTestimony(dispatch);
    onHide();
  } catch (error) {
    dispatch(testimonyError(error.response.data.message));
  }
};

export const approvedTestimonies = async (dispatch) => {
  dispatch(gettestimonyStarted());
  try {
    const { data } = await api.get("/testimony/approved-testimonies");
    dispatch(getApprovedTestimonies(data.testimonies));
  } catch (error) {
    dispatch(testimonyError(error.response.data.message));
  }
};
