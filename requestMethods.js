import axios from "axios";
import  AsyncStorage  from "@react-native-async-storage/async-storage";

// get token from storage
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
      console.log("token access: ", value);
      return value;
    }
  } catch(e) {
    // error reading value
    console.log("error geting token async");
    console.log("ERRR: " , e);
  }
}
getData();

// user axios request
export const userRequest = axios.create({
  baseURL: 'http://34.245.213.76:3000',
});

// articles axios request
export const articleRequest = axios.create({
  baseURL: 'http://34.245.213.76:3000',
})