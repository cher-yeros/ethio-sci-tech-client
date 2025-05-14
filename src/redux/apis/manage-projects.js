import api from "../../utils/api";
import {
  getAllproject,
  getprojectstarted,
  projectError,
  getSingleproject as gSU,
} from "../projectSlice";

export const getAllProject = async (dispatch, currentPage, query) => {
  dispatch(getprojectstarted());
  try {
    const { data } = await api.get(
      `/admin/all-projects?page=${currentPage}&query=${query}`
    );
    dispatch(getAllproject(data));
  } catch (error) {
    dispatch(projectError(error.response.data.message));
  }
};

export const deleteProject = async (ProjectId, dispatch) => {
  dispatch(getprojectstarted());
  try {
    const { data } = await api.delete("/admin/delete-project/" + ProjectId);
    getAllproject(dispatch);
  } catch (error) {
    dispatch(projectError(error.response.data.message));
  }
};
export const getSingleProject = async (ProjectId, dispatch) => {
  dispatch(getprojectstarted());
  try {
    //console.log(ProjectId);
    const { data } = await api.get("/Project/Project/" + ProjectId);
    //console.log(data);
    dispatch(gSU(data.Project));
  } catch (error) {
    dispatch(projectError(error.response.data.message));
  }
};
export const updateProject = async (
  projectId,
  project,
  dispatch,
  setError,
  setProject
) => {
  dispatch(getprojectstarted());
  try {
    const { data } = await api.put(
      "/admin/update-project/" + projectId,
      project
    );
    await getAllProject(dispatch);
    setError([]);
    //setProject({});
    //setSuccess(["Successfully Updated!"]);
    alert("Project successfully Updated!");
  } catch (error) {
    //console.log(error);
    setError(error.response?.data?.message.split(","));
    dispatch(projectError(error.response?.data.message));
  }
};

export const addProject = async (
  Project,
  dispatch,
  onHide,
  setError,
  setProject
) => {
  dispatch(getprojectstarted());
  try {
    const { data } = await api.post("/admin/add-project", Project);
    await getAllProject(dispatch);
    setError([]);
    setProject({});
    onHide();
  } catch (error) {
    setError(error.response.data.message.split(","));
    dispatch(projectError(error.response.data.message));
  }
};
