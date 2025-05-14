import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    about: {
      success: false,
      about: {},
    },
    error: {
      error: false,
      message: "",
    },
    pending: false,
  },
  reducers: {
    setAboutStarted(state, action) {
      state.pending = true;
    },
    getAbout(state, action) {
      state.about = action.payload;
      state.pending = false;
    },
    addabout(state, action) {
      state.about.push(action.payload);
    },
    aboutError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
  },
});

export const { setAboutStarted, getAbout, aboutError } = aboutSlice.actions;
export default aboutSlice.reducer;
