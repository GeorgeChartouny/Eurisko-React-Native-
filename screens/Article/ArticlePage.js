import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";

export const ArticlePage = ({ route }) => {
  // getting the props debending of the articled pressed
  const articleData = route.params.selectedArticle;


  // function trigger it if the content is HTML
      // const formatHTML = (content) => {
      //   const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
      //   return text;
      // };

  return (

    <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
      {articleData.multimedia==null ? (
        <Image
          style={styles.imageSection}
          source={{
            uri: `https://static01.nyt.com/${articleData.multimedia}`,
          }}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.imageSection}
          source={require("../../assets/No_Image.png")}
          resizeMode="cover"
        />
      )}
      <View style={styles.articleContainer}>
        <View>
          <Text style={styles.articleTitle}>{articleData.headline.main}</Text>
          <Text style={styles.articleInfo}>
            {articleData.byline.original} - Posted on {articleData.pub_date}
          </Text>
        </View>
        <View style={styles.articleContent}>
          <Text style={styles.articleAbstract}>
            {/* {formatHTML(articleData.abstract)} */}
            {articleData.lead_paragraph}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    height: 250,
    borderRadius: 4,
  },
  articleContainer: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 23,
    color: "#323232",
    fontFamily: "Times New Roman",
    fontWeight: "600",
  },
  articleInfo: {
    fontSize: 12,
    color: "#828282",
    fontFamily: "Times New Roman",
    fontWeight: "100",
  },

  articleContent: {
    marginTop: 30,
  },
  articleAbstract: {
    fontSize: 16,
    fontFamily: "Times New Roman",
    fontWeight: "200",
    lineHeight: 20,
  },
});
