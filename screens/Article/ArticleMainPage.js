import React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Button } from "react-native-paper";
import { getArticle } from "../../redux/apiArticleCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const ArticleMainPage = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // disaptching articles from redux store
  const { error, isFetching, message, articles } = useSelector(
    (state) => state.article
  );
  const handleGetArticles = async () => {
    try {
      await AsyncStorage.getItem("@storage_Key");
      await getArticle(dispatch, page);
      console.log("dispatching articles from storage");
    } catch (e) {
      console.log("Error fetching articles from storage: ", e);
    }
  };

  // removing token from storage on logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("@storage_Key");
    console.log("token removed from storage");
    navigation.navigate("Login");
  };

  useEffect(() => {
    handleGetArticles();
  }, [page]);

  return (
    <>
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
      {isFetching ? (
        <ActivityIndicator
          color="#137DC5"
          size="large"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      ) : (
        <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
          {articles &&
            articles
              .filter((article) => {
                if (searchTerm == "") {
                  return article;
                } else if (
                  JSON.stringify(article.headline.main)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  JSON.stringify(article.lead_paragraph)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return article;
                }
              })
              .map((article, index) => {
                return (
                  <View key={article._id}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() =>
                        navigation.navigate("ArticlePage", {
                          selectedArticle: article,
                        })
                      }
                    >
                      <View style={styles.cardContainer}>
                        <View>
                          {article.multimedia.length === 0 ? (
                            <Image
                              style={styles.cardImage}
                              source={require("../../assets/No_Image.png")}
                              resizeMode="cover"
                            />
                          ) : (
                            article.multimedia.map((img, index) => {
                              return (
                                index === 0 && (
                                  <Image
                                    key={index}
                                    style={styles.cardImage}
                                    source={{
                                      uri: `https://static01.nyt.com/${img.url}`,
                                    }}
                                    resizeMode="cover"
                                  />
                                )
                              );
                            })
                          )}
                        </View>
                        <View style={styles.contentInfo}>
                          <Text style={styles.titleMain}>
                            {article.headline.main}
                          </Text>
                          <View style={styles.bottomCard}>
                            <Text style={styles.publisherName}>
                              {article.byline.original} -
                            </Text>
                            <Text style={styles.publishDate}>
                              Published on {JSON.stringify(article.pub_date).slice(1,11)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
        </ScrollView>
      )}
      {error && <Text style={styles.ErrorMessage}> {message}</Text>}
    </>
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
    // minWidth: 100,
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
  cardContainer: {
    backgroundColor: "#fff",
    margin: 10,
    shadowColor: "#dddddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardImage: {
    height: 250,
    justifyContent: "space-around",
  },
  contentInfo: {
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  titleMain: {
    color: "#137DC5",
    fontSize: 16,
    padding: 10,
  },

  bottomCard: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    padding: 10,
  },

  publisherName: {
    color: "#828282",
    fontSize: 12,
  },
  publishDate: {
    color: "#828282",
    fontSize: 12,
  },
  ErrorMessage: {
    color: "red",
    fontSize: 30,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});
