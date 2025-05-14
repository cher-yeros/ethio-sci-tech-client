import { createSlice } from "@reduxjs/toolkit";

const gallarySlice = createSlice({
  name: "gallary",
  initialState: {
    gallary: {
      success: false,
      gallaries: [],
    },
    error: {
      error: false,
      message: "",
    },
    pending: false,
  },
  reducers: {
    setGallaryStarted(state, action) {
      state.pending = true;
    },
    getGallary(state, action) {
      state.gallary = action.payload;
      state.pending = false;
    },
    addgallary(state, action) {
      state.gallary.push(action.payload);
    },
    gallaryError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
  },
});

export const { setGallaryStarted, getGallary, gallaryError } =
  gallarySlice.actions;
export default gallarySlice.reducer;
