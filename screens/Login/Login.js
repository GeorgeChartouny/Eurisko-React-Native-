import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiLoginCalls";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleLogin = async () => {
    login(dispatch, { email, password });
    const TOKEN = await currentUser?.accessToken;
    console.log("TOKEN LOGIN: ", TOKEN);
  };

  return (
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
      >
        Login
      </Button>
      <StatusBar style="auto" />
    </View>
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
});
