import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    error: false,
    currenUser: null,
    isFetching: false,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      console.log("login start");
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currenUser = action.payload;
      console.log("login success");
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("login failure");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
