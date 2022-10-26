import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { articleRequest } from "../../requestMethods";

export const ArticleComponent = (props) => {
  

  return (
    <ScrollView>

      {proos.article.map((article, index) => {
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
    fontFamily: "Times New Roman",
  },

  articalContent: {
    marginTop: 30,
  },

  articleParagraph: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Times New Roman",
  },
});
