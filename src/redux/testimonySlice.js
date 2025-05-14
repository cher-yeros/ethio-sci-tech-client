import { createSlice } from "@reduxjs/toolkit";

const testimonySlice = createSlice({
  name: "testimony",
  initialState: {
    testimony: {
      success: false,
      testimonyCount: 0,
      testimonies: [],
      resPerPage: 0,
    },
    approvedTestimonies: [],
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singletestimony: {},
  },
  reducers: {
    gettestimonyStarted(state, action) {
      state.pending = true;
    },
    getAlltestimony(state, action) {
      state.testimony = action.payload;
      state.pending = false;
    },
    getApprovedTestimonies(state, action) {
      state.approvedTestimonies = action.payload;
      state.pending = false;
    },
    addtestimony(state, action) {
      state.testimony.push(action.payload);
    },
    testimonyError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingletestimony(state, action) {
      state.singleUser = action.payload;
      state.pending = false;
    },
  },
});

export const {
  getAlltestimony,
  gettestimonyStarted,
  testimonyError,
  getSingletestimony,
  getApprovedTestimonies,
} = testimonySlice.actions;
export default testimonySlice.reducer;
