import axios from "axios";
import  AsyncStorage  from "@react-native-async-storage/async-storage";


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

export const userRequest = axios.create({
  baseURL: 'http://34.245.213.76:3000',
});
  