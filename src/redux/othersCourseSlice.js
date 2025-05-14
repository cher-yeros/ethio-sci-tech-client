import { createSlice } from "@reduxjs/toolkit";

const othersCourseSlice = createSlice({
  name: "othersCourse",
  initialState: {
    course: {
      success: false,
      othersCourseCount: 0,
      courses: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
    },
    singleothersCourse: {},
  },
  reducers: {
    getothersCourseStarted(state, action) {
      state.pending = true;
    },
    getAllothersCourse(state, action) {
      state.course = action.payload;
      state.pending = false;
    },
    addothersCourse(state, action) {
      state.othersCourse.push(action.payload);
    },
    addothersCourseEnd(state, action) {
      state.pending = true;
      state.error = {
        error: false,
        message: "",
      };
    },
    othersCourseError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingleothersCourse(state, action) {
      state.singleUser = action.payload;
      state.pending = false;
    },
  },
});

export const {
  getAllothersCourse,
  getothersCourseStarted,
  othersCourseError,
  getSingleothersCourse,
  addothersCourseEnd,
} = othersCourseSlice.actions;
export default othersCourseSlice.reducer;
