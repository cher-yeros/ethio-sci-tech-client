import { createSlice } from "@reduxjs/toolkit";

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subject: {
      success: false,
      count: 0,
      subjects: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singlesubject: {},
    subjectCategory: {
      Natural_Science: [],
      Social_Science: [],
      Science_And_Technology: [],
      History_And_Art: [],
      Miscellaneous: [],
    },
  },
  reducers: {
    getsubjectStarted(state, action) {
      state.pending = true;
    },
    getAllsubject(state, action) {
      state.subject = action.payload;
      state.pending = false;
    },
    addsubject(state, action) {
      state.subject.push(action.payload);
    },
    subjectError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSinglesubject(state, action) {
      state.singleUser = action.payload;
    },
    setSubjectCategory(state, action) {
      state.subjectCategory = action.payload;
      state.pending = false;
    },
  },
});

export const {
  getAllsubject,
  getsubjectStarted,
  subjectError,
  setSubjectCategory,
} = subjectSlice.actions;
export default subjectSlice.reducer;
