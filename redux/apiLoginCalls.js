import { loginStart, loginFailure, loginSuccess } from "./userRedux";
import { userRequest } from "../requestMethods";
import  AsyncStorage  from "@react-native-async-storage/async-storage";


export const login = async (dispatch, user) => {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
      console.log("Cannot set token: ", e);
    }
  }


const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
      console.log("token access: ", value);
    }
  } catch(e) {
    // error reading value
    console.log("error geting token async");
    console.log("ERRR: " , e);
  }
}
  dispatch(loginStart());



  try {
    const response = await userRequest.post("/auth/signin", user);
 
    if( data.error){
      console.log("error fetchingg: " , data.message);
    }
    if(data.accessToken) {

      dispatch(loginSuccess(response.data));
      const token = response.data.accessToken;
      console.log("token from loginSuccess: " , response.data.accessToken)
    
   

    storeData(token);
    getData();
    }

  } catch (error) {
    dispatch(loginFailure());
    console.log("response fail ");
    console.log("Error: " , error);
  }
};
