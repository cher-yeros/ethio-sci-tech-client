import { createSlice } from "@reduxjs/toolkit";

const apparatusSlice = createSlice({
  name: "apparatus",
  initialState: {
    apparatus: {
      success: false,
      count: 0,
      apparatuses: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singleApparatus: {},
  },
  reducers: {
    getapparatusStarted(state, action) {
      state.pending = true;
    },
    getAllapparatus(state, action) {
      state.apparatus = action.payload;
      state.pending = false;
    },
    addApparatus(state, action) {
      state.apparatus.push(action.payload);
    },
    apparatusError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingleApparatus(state, action) {
      state.singleUser = action.payload;
    },
  },
});

export const {
  getAllapparatus,
  getapparatusStarted,
  apparatusError,
  getSingleUser,
  getSingleApparatus,
} = apparatusSlice.actions;
export default apparatusSlice.reducer;
