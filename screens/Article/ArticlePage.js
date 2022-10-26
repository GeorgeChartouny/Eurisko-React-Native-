import { View, Text } from "react-native";
import React from "react";
import { ArticleComponent } from "./ArticleComponent";
import { useEffect, useState } from "react";


export const ArticlePage = ({ navigation }) => {


  return (
    <View>
      {/* <Text>ArticlePage</Text> */}
      <ArticleComponent  />
    </View>
  );
};
