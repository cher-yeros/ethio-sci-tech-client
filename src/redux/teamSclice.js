import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: {
      success: false,
      teams: [],
    },
    error: {
      error: false,
      message: "",
    },
    pending: false,
  },
  reducers: {
    setTeamStarted(state, action) {
      state.pending = true;
    },
    getTeam(state, action) {
      state.team = action.payload;
      state.pending = false;
    },
    addTeam(state, action) {
      state.team.teams.push(action.payload);
    },
    teamError(state, action) {
      state.error.error = true;
      state.error.message = action.payload;
      state.pending = false;
    },
  },
});

export const { setTeamStarted, getTeam, teamError, addTeam } =
  teamSlice.actions;
export default teamSlice.reducer;
