import { createSlice } from "@reduxjs/toolkit";

// creating the user slice with initial states
const userSlice = createSlice({
  name: "user",
  initialState: {
    error: false,
    currenUser: null,
    isFetching: false,
    message: "",
  },

  //reducers triggered depending on the state
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.message = "";
    },
    // if credentials are correct, update the currentUser data, in this case only adding the accessToken
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.message = "";
      state.currenUser = action.payload;
    },
    // if loginFailed
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    logOut: (state) => {
      state.currenUser = null;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure,logOut } = userSlice.actions;
export default userSlice.reducer;
