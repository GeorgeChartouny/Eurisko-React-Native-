import { View, Text } from "react-native";
import React from "react";
import { ArticleComponent } from "./ArticleComponent";
import { useEffect, useState } from "react";

export const ArticlePage = ({ route }) => {
  const articleData = route.params.selectedArticle;
  console.log("articleData: ", articleData);

  return (
    <View>
      {/* <Text>ArticlePage</Text> */}
      <ArticleComponent article={articleData} />
    </View>
  );
};
