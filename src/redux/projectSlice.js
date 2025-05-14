import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: {
      success: false,
      count: 0,
      projects: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singleproject: {
      title: "",
      thumbnail: "",
      subject: "",
      youtubeLink: "",
    },
    projectBySubject: [],
  },
  reducers: {
    getprojectstarted(state, action) {
      state.pending = true;
    },
    getAllproject(state, action) {
      state.project = action.payload;
      state.pending = false;
    },
    addproject(state, action) {
      state.project.push(action.payload);
    },
    projectError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingleproject(state, action) {
      state.singleproject = action.payload;
    },
    setprojectBySubject(state, action) {
      state.projectBySubject = action.payload;
    },
  },
});

export const {
  getAllproject,
  getprojectstarted,
  projectError,
  getSingleproject,
  setprojectBySubject,
} = projectSlice.actions;
export default projectSlice.reducer;
