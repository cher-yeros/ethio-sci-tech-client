import api from "../../utils/api";
import {
  getSingleApparatus as gSU,
  getapparatusStarted,
  getAllapparatus,
  apparatusError,
} from "../apparatusSlice";

export const getAllApparatuss = async (dispatch, currentPage, query) => {
  dispatch(getapparatusStarted());
  try {
    const { data } = await api.get(
      `/apparatus/all-apparatus?page=${currentPage}&keyword=${query}`
    );

    dispatch(getAllapparatus(data));
  } catch (error) {
    dispatch(apparatusError(error.response.data.message));
  }
};

export const deleteApparatus = async (apparatusId, dispatch) => {
  dispatch(getapparatusStarted());
  try {
    const { data } = await api.delete(
      "/apparatus/delete-apparatus/" + apparatusId
    );
    //getAllApparatuss(dispatch);
    await getAllApparatuss(dispatch);
  } catch (error) {
    dispatch(apparatusError(error.response.data.message));
  }
};
export const getSingleApparatus = async (ApparatusId, dispatch) => {
  dispatch(getapparatusStarted());
  try {
    const { data } = await api.get("/admin/Apparatus/" + ApparatusId);
    dispatch(gSU(data.Apparatus));
  } catch (error) {
    dispatch(apparatusError(error.response.data.message));
  }
};
export const updateApparatus = async (
  apparatusId,
  apparatus,
  dispatch,
  setError,
  setApparatus
) => {
  dispatch(getapparatusStarted());
  try {
    const { data } = await api.put(
      "/apparatus/update-apparatus/" + apparatusId,
      apparatus
    );
    setError([]);
    alert("Apparatus updated successfully!");
    await getAllApparatuss(dispatch);
    //onHide();
  } catch (error) {
    setError(error.response.data.message.split("\n"));
    dispatch(apparatusError(error.response.data.message));
  }
};
export const addApparatus = async (apparatus, dispatch, onHide) => {
  dispatch(getapparatusStarted());
  try {
    const { data } = await api.post("/apparatus/add-apparatus", apparatus);
    await getAllApparatuss(dispatch);
    onHide();
  } catch (error) {
    dispatch(apparatusError(error.response.data.message));
  }
};
