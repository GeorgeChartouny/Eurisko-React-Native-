import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./userRedux";
import articleSlice from "./articleRedux";

// creating redux store and adding the reducers
export const store = configureStore({
  reducer: {
    user: userSlice,
    article: articleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
