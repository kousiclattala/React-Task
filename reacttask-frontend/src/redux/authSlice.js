import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  candidates: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
  },
});

export const { setIsLoggedIn, setCandidates } = authSlice.actions;

export default authSlice.reducer;
