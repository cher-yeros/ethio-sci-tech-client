import { createSlice } from "@reduxjs/toolkit";

const instructorsSlice = createSlice({
  name: "instructor",
  initialState: {
    instructor: {
      success: false,
      instructors: [],
    },
    error: {
      error: false,
      message: "",
    },
    pending: false,
  },
  reducers: {
    setInstructorStarted(state, action) {
      state.pending = true;
    },
    getInstructor(state, action) {
      state.instructor = action.payload;
      state.pending = false;
    },
    addgallary(state, action) {
      state.gallary.push(action.payload);
    },
    instructorError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
  },
});

export const { setInstructorStarted, getInstructor, instructorError } =
  instructorsSlice.actions;
export default instructorsSlice.reducer;
