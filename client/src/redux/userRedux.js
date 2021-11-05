import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    start: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errorMessage = "";
      state.currentUser = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errorMessage = "";
      state.currentUser = action.payload;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errorMessage = "";
      state.successMessage = action.payload;
    },
    resetPasswordSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.errorMessage = "";
    },
    logout: (state) => {
      state.currentUser = null;
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.successMessage = "";
    },
    reset: (state) => {
      state.isFetching = false;
      state.error = false;
      state.errorMessage = "";
      state.successMessage = "";
      state.currentUser = null;
    },
  },
});

export const {
  start,
  loginSuccess,
  failure,
  logout,
  forgotPasswordSuccess,
  reset,
  resetPasswordSuccess,
  registerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
