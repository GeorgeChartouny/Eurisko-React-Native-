import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userRedux";

// creating redux store and adding the reducers
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
