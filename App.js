import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { Login } from "./screens/Login/Login";
import {ArticlePage} from "./screens/Article/ArticlePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {ArticleMainPage} from "./screens/Article/ArticleMainPage"

 function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ArticleMainPage" component={ArticleMainPage}/>
        <Stack.Screen name="Article" component={ArticlePage} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default () => {
  return (
    
    <Provider store={store}>
    <App/>
</Provider>
    )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
