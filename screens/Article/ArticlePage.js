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
      {articleData.multimedia.length === 0 ? (
        <Image
          style={styles.imageSection}
          source={require("../../assets/No_Image.png")}
          resizeMode="cover"
        />
      ) : (
        articleData.multimedia.map((img, index) => {
          return (
            index === 0 && (
              <Image
                key={index}
                style={styles.imageSection}
                source={{
                  uri: `https://static01.nyt.com/${img.url}`,
                }}
                resizeMode="cover"
              />
            )
          );
        })
      )}
      <View style={styles.articleContainer}>
        <View>
          <Text style={styles.articleTitle}>{articleData.headline.main}</Text>
          <Text style={styles.articleInfo}>{articleData.byline.original}</Text>
          <Text style={styles.articleInfo}>
          Published on {JSON.stringify(articleData.pub_date).slice(1,11)}
          </Text>
        </View>
        <View style={styles.articleContent}>
          <Text style={styles.articleParagraph}>
            {/* {formatHTML(articleData.abstract)} */}

            {articleData.lead_paragraph
              ? articleData.lead_paragraph
              : "This article is empty"}
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
    borderWidth: 1,
    borderColor: "#137DC5",
    margin: 5,
  },
  articleContainer: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 25,
    color: "#137DC5",
    fontFamily: "Times New Roman",
    fontWeight: "600",
  },
  articleInfo: {
    fontSize: 20,
    color: "#828282",
    fontFamily: "Helvetica",
    fontWeight: "100",
  },

  articleContent: {
    marginTop: 30,
  },
  articleParagraph: {
    fontSize: 25,
    fontFamily: "Georgia",
    fontWeight: "normal",
    color: "#074c7a",
    // lineHeight: 20,
  },
});
