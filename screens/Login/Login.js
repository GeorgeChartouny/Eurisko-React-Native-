import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiLoginCalls";
// import AsyncStorage from "@react-native-async-storage/async-storage";


export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [err, setErr] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { isFetching, error, message, currentUser } = useSelector(
    (state) => state.user
  );

  // Passing username and password to redux
  const handleLogin = async () => {
    try {
      await login(dispatch, { username, password });
      if (!message) {
        navigation.navigate("ArticleMainPage");
        console.log("login success");
      }
      if (message) {
        console.log("message!!!", message);
      }
    } catch (e) {
      console.log("Error logging in!");
      console.log("catch error logging in: ", e);
    }
  };

  // condition to set login button disabled/enabled
  const handleButton = () => {
    if ((username == "" && password == "")|| isFetching) {
      setDisabled(true);
    }
    if (username !== "" && password !== "") {
      setDisabled(false);
    }
  };

  // call handleButton with username and password dependencies
  useEffect(() => {
    handleButton();
  }, [username, password, isFetching]);

  return (
    <>
      {isFetching ? (
        <ActivityIndicator
          color="#137DC5"
          size="large"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      ) : (
        <View style={styles.container}>
          <Image
            source={require("../../assets/eurisko.jpg")}
            style={styles.imageSize}
          />

          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
          />
          <Button
            mode="contained"
            style={styles.button}
            title="Login"
            onPress={() => handleLogin()}
            disabled={disabled}
          >
            Login
          </Button>
          {error && <Text style={styles.ErrorMessage}>{message}</Text>}
          <StatusBar style="auto" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  imageSize: {
    width: 250,
    height: 200,
  },

  input: {
    margin: 10,
    height: 40,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#137DC5",
    padding: 10,
  },
  button: {
    margin: 30,
    backgroundColor: "#137DC5",
  },

  ErrorMessage: {
    color: "red",
  },
});
