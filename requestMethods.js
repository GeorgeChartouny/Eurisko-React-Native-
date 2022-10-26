import axios from "axios";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

console.log("Storage: ", AsyncStorage);

export const userRequest = axios.create({
  baseURL: process.env.BASE_URL,
});
