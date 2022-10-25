import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userRedux";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});
