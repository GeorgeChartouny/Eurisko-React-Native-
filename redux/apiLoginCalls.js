import { loginStart, loginFailure, loginSuccess } from "./userRedux";
import { userRequest } from "../requestMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (dispatch, user) => {
  // call redux function loginStart
  dispatch(loginStart());

  // storing token in AsyncStorage
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (e) {
      // logging error
      console.log("Cannot set token: ", e);
    }
  };

  // fetching token from AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
        console.log("token access: ", value);
      }
    } catch (e) {
      // error reading value
      console.log("error geting token async");
      console.log("ERRR: ", e);
    }
  };

  // calling the api to login
  try {
    const response = await userRequest.post("/auth/signin", user);

    // console.log("response: " , response);
    // send user data to login sucess
    if (response.status == 201) {
      const token = response.data.accessToken;
      console.log("token from loginSuccess: ", response.data.accessToken);
      dispatch(loginSuccess(response.data));

      // call the async function for storing token
      storeData(token);
      getData();
    }
  } catch (error) {
    // trigger loginFailure from redux
    dispatch(loginFailure(error.response.data.message));
    console.log("catch error ");
    console.log("Error: ", error.response.data.message);
  }
};
