import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      success: false,
      usersCount: 0,
      users: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singleUser: {},
  },
  reducers: {
    getUsersStarted(state, action) {
      state.pending = true;
    },
    getAllUsers(state, action) {
      state.users = action.payload;
      state.pending = false;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    usersError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingleUser(state, action) {
      state.singleUser = action.payload;
      state.pending = false;
    },
  },
});

export const { getAllUsers, getUsersStarted, usersError, getSingleUser } =
  userSlice.actions;
export default userSlice.reducer;
