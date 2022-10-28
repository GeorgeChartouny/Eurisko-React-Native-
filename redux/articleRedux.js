import { createSlice } from "@reduxjs/toolkit";

//creating the article slice with initial states
const articleSlice = createSlice({
  name: "article",
  initialState: {
    error: false,
    isFetching: false,
    message: null,
    articles: null,
  },

  //reducers triggered depending on the state

  reducers: {
    articleFetchStart: (state) => {
      state.error = false;
      state.isFetching = true;
      state.message = null
    },

    //if user is authorized and status 200
    articleFetchSuccess: (state, action)=> {
        state.isFetching = false;
        state.error = false;
        state.message = null,
        state.articles = action.payload;
    },
    // if response status is other than 200
    articleFetchFailure:(state, action) => {
        state.isFetching = false;
        state.error = true;
        state.message = action.payload;
    }
  },
});

export const {articleFetchStart, articleFetchSuccess, articleFetchFailure} = articleSlice.actions;
export default articleSlice.reducer;
