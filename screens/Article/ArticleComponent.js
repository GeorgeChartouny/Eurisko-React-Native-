import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { articleRequest } from "../../requestMethods";

export const ArticleComponent = () => {
  const [page, setPage] = useState(1);

  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      //   const response = await fetch(`http://34.245.213.76:3000/articles`, {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${await AsyncStorage.getItem("@storage_Key")}`,
      //       Accept: "application/json",
      //     },
      //     content: "application/json",
      //   });

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

          //   console.log("response articles: ", res.data.response.docs);
        });
      //   console.log("response articles: ", response);
      //   const data = await response.json();
      //   setArticles(data);
    } catch (e) {
      console.log("Error fetching articles: ", e);
    }
  };
  console.log("articles: ", articles);

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <ScrollView>
    
      {/* <Text> {articles.status}</Text> */}
      {/* <Text>{articles.response.docs[0]}</Text> */}

      {/* {articles.response.docs.map((article, index) => {
        return (
          <View>
            <Text>{article.abstract}</Text>
          </View> 
        );
      })} */}

      {articles.map((article, index) => {
        return (
          <>
            <View key={index}>
              {article.multimedia ? (
                <Image
                  style={{ height: 250 }}
                  source={{
                    uri: `https://static01.nyt.com/${article.multimedia}`,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={{ height: 250 }}
                  source={require("../../assets/eurisko.jpg")}
                />
              )}
            </View>
            <View style={styles.articleContainer}>
              <View>
                <Text style={styles.articleTitle}>{article.headline.main}</Text>
              </View>
              <View style={styles.articalContent}>
                <Text style={styles.articleParagraph}>
                  {article.lead_paragraph}
                </Text>
              </View>
            </View>
          </>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10,
  },

  articleTitle: {
    fontSize: 20,
    color: "#137DC5",
    fontFamily: "Roboto-Bold",
  },

  articalContent: {
    marginTop: 30,
  },

  articleParagraph: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Roboto-Light",
  },
});
