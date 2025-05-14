import api from "../../utils/api";
import {
  getAllUsers,
  getUsersStarted,
  usersError,
  getSingleUser as gSU,
} from "../usersSlice";

export const getAllUser = async (dispatch, currentPage, query) => {
  dispatch(getUsersStarted());
  try {
    const { data } = await api.get(
      `/admin/users?page=${currentPage}&keyword=${query}`
    );
    dispatch(getAllUsers(data));
  } catch (error) {
    dispatch(usersError(error.response.data.message));
  }
};

export const deleteUser = async (userId, dispatch) => {
  dispatch(getUsersStarted());
  try {
    const { data } = await api.delete("/admin/user/" + userId);
    await getAllUser(dispatch);
  } catch (error) {
    dispatch(usersError(error.response.data.message));
  }
};
export const getSingleUser = async (userId, dispatch) => {
  dispatch(getUsersStarted());
  try {
    const { data } = await api.get("/admin/user/" + userId);
    dispatch(gSU(data.user));
  } catch (error) {
    dispatch(usersError(error.response.data.message));
  }
};
export const updateUser = async (userId, credential, dispatch, onHide) => {
  dispatch(getUsersStarted());
  try {
    const { data } = await api.put("/admin/user/" + userId, credential);
    await getAllUser(dispatch);
    onHide();
  } catch (error) {
    dispatch(usersError(error.response.data.message));
  }
};
export const addUser = async (credential, dispatch, onHide) => {
  dispatch(getUsersStarted());
  try {
    const { data } = await api.post("/admin/user", credential);
    await getAllUser(dispatch);
    onHide();
  } catch (error) {
    dispatch(usersError(error.response.data.message));
  }
};
