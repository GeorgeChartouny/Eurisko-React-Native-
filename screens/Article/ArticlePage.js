import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { ArticleComponent } from "./ArticleComponent";
import { useEffect, useState } from "react";

export const ArticlePage = ({ route }) => {
  const articleData = route.params.selectedArticle;
  console.log("articleData: ", articleData);

  const formatHTML = (content) => {
    const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return text;
  };

  return (
    // <View>
    //   {/* <Text>ArticlePage</Text> */}
    //   <ArticleComponent article={articleData} />
    // </View>

    <ScrollView style={{ backgroundColor: "#f0f0f0" }}>
      {articleData.multimedia ? (
        <Image
          style={styles.imageSection}
          source={{
            uri: `https://static01.nyt.com/${article.multimedia}`,
          }}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.imageSection}
          source={require("../../assets/No_Image.jpg")}
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
            {formatHTML(articleData.abstract)}
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
    fontWeight: 600,
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
