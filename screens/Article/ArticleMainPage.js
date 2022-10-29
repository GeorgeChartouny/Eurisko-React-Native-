import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Button,
  SafeAreaView,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getArticle } from "../../redux/apiArticleCalls";



import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ArticleCardComponent } from "./ArticleCardComponent";


const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const ArticleMainPage = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  // const navigation = useNavigation();

  console.log("SEARCHTEM: ", searchTerm);

  const [articlesData, setArticlesData] = useState([]);

  const dispatch = useDispatch();



  // dispatch getArticle from redux
  const handleGetArticles = async () => {
    try {
      await AsyncStorage.getItem("@storage_Key");
      await getArticle(dispatch, page);
      setArticlesData([...articlesData, ...articles]); // spread operators
      console.log("dispatching articles from storage");
    } catch (e) {
      console.log("Error fetching articles from storage: ", e.response);
    }
  };

  useEffect(() => {
    handleGetArticles();
  }, [page]);

  // callback function to refresh the screen on pull
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  // removing token from storage on logout
  const handleLogout = async () => {
    // await AsyncStorage.removeItem("@storage_Key");
    try {
      await AsyncStorage.removeItem("@storage_Key");
      console.log("token removed from storage");
      navigation.navigate("Login");
    } catch (e) {
      console.log("Cannot logout");
    }
  };

  const { error, isFetching, message, articles } = useSelector(
    (state) => state.article
  );

  const renderItem = ({ item, index }) => {
    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("ArticlePage", { selectedArticle: item })
          }
        >
          <View style={styles.cardContainer}>
            <View>
              {item.multimedia.length === 0 ? (
                <Image
                  style={styles.cardImage}
                  source={require("../../assets/No_Image.png")}
                  resizeMode="cover"
                />
              ) : (
                item.multimedia.map((img, index) => {
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
              <Text style={styles.titleMain}>{item.headline.main}</Text>
              <View style={styles.bottomCard}>
                <Text style={styles.publisherName}>
                  {item.byline.original
                    ? item.byline.original
                    : "Name Not Available"}
                </Text>
                <Text style={styles.publishDate}>
                  {" "}
                  - Published On {JSON.stringify(item.pub_date).slice(1, 11)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
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
          {/* <ArticleCardComponent searchTerm={searchTerm.toLowerCase()} /> */}
          {isFetching && error ? (
            <ActivityIndicator
              color="#137DC5"
              size="large"
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onEndReachedThreshold={0}
              data={
                articlesData &&
                articlesData.filter((article) => {
                  if (searchTerm == "") {
                    return article;
                  } else if (
                    JSON.stringify(article.headline.main)
                      .toLowerCase()
                      .includes(searchTerm) ||
                    JSON.stringify(article.lead_paragraph)
                      .toLowerCase()
                      .includes(searchTerm)
                  ) {
                    return article;
                  }
                })
              }
              renderItem={renderItem}
              onEndReached={() =>
                searchTerm == "" ? setPage(page == 2 ? page : page + 1) : null
              }
            />
          )}
          {error && <Text style={styles.ErrorMessage}> {message}</Text>}
        </>
      </SafeAreaView>
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
