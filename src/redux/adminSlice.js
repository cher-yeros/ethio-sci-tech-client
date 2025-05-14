import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "admin",
  initialState: {
    count: {
      success: true,
      counts: {
        users: {
          allUsers: 0,
          instructors: 0,
          scholars: 0,
          student: 0,
          family: 0,
          others: 0,
        },
        apparatus: 0,
        testimony: 0,
        courses: 0,
        feedbacks: 0,
        subjects: 0,
        orders: 0,
      },
      pending: false,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singleUser: {},
  },
  reducers: {
    getCountStarted(state, action) {
      state.pending = true;
    },
    setCount(state, action) {
      state.count = action.payload;
      state.pending = false;
    },
    adminError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
  },
});

export const {
  getAllUsers,
  getCountStarted,
  adminError,
  getSingleUser,
  setCount,
} = userSlice.actions;
export default userSlice.reducer;
