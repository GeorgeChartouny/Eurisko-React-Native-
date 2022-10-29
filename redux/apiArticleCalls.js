import {
  articleFetchStart,
  articleFetchFailure,
  articleFetchSuccess,
} from "./articleRedux";
import { articleRequest } from "../requestMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getArticle = async (dispatch, page) => {
  dispatch(articleFetchStart());
  
  console.log("Page: " , page);
  try {
    const response = await articleRequest.get(`/articles?page=${page}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("@storage_Key")}`,
      },
    });
    if (response.status == 200) {
      dispatch(articleFetchSuccess(response.data.response.docs));
      console.log("article fetched successfully");
    }
  } catch (e) {
    dispatch(articleFetchFailure(e.response));
    console.log("Catching error in fetching article: ", e);
  }
};
