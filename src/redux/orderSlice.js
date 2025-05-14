import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {
      success: false,
      orderCount: 0,
      orders: [],
      resPerPage: 0,
    },
    error: {
      error: false,
      message: "",
      pending: false,
    },
    singleorder: {},
  },
  reducers: {
    getorderStarted(state, action) {
      state.pending = true;
    },
    getAllorder(state, action) {
      state.order = action.payload;
      state.pending = false;
    },
    addorder(state, action) {
      state.order.push(action.payload);
    },
    orderError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
    getSingleorder(state, action) {
      state.singleUser = action.payload;
            state.pending = false;

    },
  },
});

export const { getAllorder, getorderStarted, orderError, getSingleorder } =
  orderSlice.actions;
export default orderSlice.reducer;
