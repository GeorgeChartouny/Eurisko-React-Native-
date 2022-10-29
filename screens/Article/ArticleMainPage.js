import React from "react";
import {  useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ArticleCardComponent } from "./ArticleCardComponent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ArticleMainPage = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");


 
  // disaptching articles from redux store
  const { error, isFetching, message } = useSelector((state) => state.article);

  // removing token from storage on logout
  const handleLogout = async () => {
    // await AsyncStorage.removeItem("@storage_Key");
    await AsyncStorage.clear();
    console.log("token removed from storage");
    navigation.navigate("Login");
    set;
  };

  return (
    <SafeAreaView>
      <View style={styles.TopContainer}>
        <View style={styles.SearchContainer}>
          <TextInput
            style={styles.SearchBar}
            placeholder="Search for an article..."
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            value={searchTerm}
          />
          <TouchableOpacity>
            <Button title="X" onPress={() => setSearchTerm("")}>
              X
            </Button>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.button}
          title="Logout"
          mode="contained"
          onPress={() => handleLogout()}
        >
          Logout
        </Button>
      </View>

      <>
        <ArticleCardComponent
          searchTerm={searchTerm.toLowerCase()}
        />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  SearchContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#137DC5",
    paddingBottom: 10,
  },
  SearchBar: {
    color: "#137DC5",
  },
  button: {
    width: 90,
    backgroundColor: "#137DC5",
    opacity: 0.6,
    borderRadius: 4,
  },
});
