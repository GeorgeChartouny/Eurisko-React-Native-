import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { Button } from "react-native-paper";

export const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/eurisko.jpg")}
        style={styles.imageSize}
      />

      <TextInput placeholder="Enter your username" style={styles.input} />
      <TextInput placeholder="Enter your password" style={styles.input} />
      <Button mode="contained" style={styles.button} title="Login">
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
