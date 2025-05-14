import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: {
      success: false,
      count: 0,
      courses: [],
      resPerPage: 0,
    },
    kidsCourses: {
      success: false,
      count: 0,
      kidsCourses: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singleCourse: {
      title: "",
      thumbnail: "",
      subject: "",
      youtubeLink: "",
    },
    courseBySubject: [],
  },
  reducers: {
    getcourseStarted(state, action) {
      state.pending = true;
    },
    getAllcourse(state, action) {
      state.course = action.payload;
      state.pending = false;
    },
    getAllkidsCourse(state, action) {
      state.kidsCourses = action.payload;
      state.pending = false;
    },
    addcourse(state, action) {
      state.course.push(action.payload);
    },
    courseError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingleCourse(state, action) {
      state.singleCourse = action.payload;
    },
    setCourseBySubject(state, action) {
      ////console.log(action.payload);
      state.courseBySubject = action.payload;
      state.pending = false;
    },
  },
});

export const {
  getAllcourse,
  getcourseStarted,
  courseError,
  getSingleCourse,
  setCourseBySubject,
  getAllkidsCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
