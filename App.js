import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login/Login";
import { SingleArticleScreen } from "./screens/Article/SingleArticleScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ArticleMainPage } from "./screens/Article/ArticleMainPage";
// import styles from "./styles/styles";

function App() {
  // screen stacked navigation
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ArticleMainPage" component={ArticleMainPage} />
        <Stack.Screen name="SingleArticleScreen" component={SingleArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
