import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: {
      success: false,
      feedbackCount: 0,
      feedbacks: [],
      resPerPage: 0,
    },
    approvedfeedbacks: [],
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singlefeedback: {},
  },
  reducers: {
    getfeedbackStarted(state, action) {
      state.pending = true;
    },
    getAllfeedback(state, action) {
      state.feedback = action.payload;
      state.pending = false;
    },
    getApprovedfeedbacks(state, action) {
      state.approvedfeedbacks = action.payload;
      state.pending = false;
    },
    addfeedback(state, action) {
      state.feedback.push(action.payload);
    },
    feedbackError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSinglefeedback(state, action) {
      state.singleUser = action.payload;
      state.pending = false;
    },
  },
});

export const {
  getAllfeedback,
  getfeedbackStarted,
  feedbackError,
  getSinglefeedback,
  getApprovedfeedbacks,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
