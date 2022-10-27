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
} from "react-native";
import { articleRequest } from "../../requestMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export const ArticleMainPage = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // fetching articles from API and passing the token in headers
  const getArticles = async () => {
    try {
      const response = await articleRequest
        .get(`/articles?page=${page}`, {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "@storage_Key"
            )}`,
          },
        })
        .then((res) => {
          setArticles(res.data.response.docs);
          setIsFetching(false);
        });
    } catch (e) {
      console.log("Error fetching articles: ", e);
    }
  };

  // removing token from storage on logout
  const handleLogout = async () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <View style={styles.TopContainer}>
        <TextInput
          style={styles.SearchBar}
          placeholder="Search for an article..."
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
          value={searchTerm}
        />
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
          {articles
            .filter((article) => {
              if (searchTerm == "") {
                return article;
              } else if (
                JSON.stringify(article)
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
                        {article.multimedia == null ? (
                          <Image
                            style={styles.cardImage}
                            source={{
                              uri: `https://static01.nyt.com/${article.multimedia}`,
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            style={styles.cardImage}
                            source={require("../../assets/No_Image.png")}
                            resizeMode="cover"
                          />
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
                            Published on {article.pub_date}
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
    </>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  SearchBar: {
    borderWidth: 1,
    borderColor: "#137DC5",
    borderRadius: 4,
    width: 150,
    backgroundColor: "#f1f1f1",
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
    height: 150,
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
});
