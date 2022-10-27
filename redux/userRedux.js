import { createSlice } from "@reduxjs/toolkit";

// creating the user slice with initial states
const userSlice = createSlice({
  name: "user",
  initialState: {
    error: false,
    currenUser: null,
    isFetching: false,
    message: null,
  },

  //reducers triggered depending on the state
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
      // if credentials are correct, update the currentUser data, in this case only adding the accessToken
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currenUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
