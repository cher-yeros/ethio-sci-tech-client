import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    sidebar: true,
  },
  reducers: {
    controlSidebar(state, payload) {
      state.sidebar = !state.sidebar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { controlSidebar } = systemSlice.actions;

export default systemSlice.reducer;
