import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    loggedIn: false,
    error: { error: false, message: "" },
    pending: false,
  },
  reducers: {
    loginStarted(state, action) {
      state.pending = true;
    },
    loginSuccess(state, action) {
      state.currentUser = action.payload;
      state.pending = false;
      state.error.error = false;
      state.loggedIn = true;
    },
    loginError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
      state.loggedIn = false;
    },

    logout(state) {
      state.currentUser = {};
      state.error = { error: false, message: "" };
      state.pending = false;
      state.loggedIn = false;
    },
  },
});

export const { loginStarted, loginSuccess, loginError, logout } =
  userSlice.actions;
export default userSlice.reducer;
