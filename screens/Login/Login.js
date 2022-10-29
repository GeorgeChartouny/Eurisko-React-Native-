import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  // Image,
  ActivityIndicator,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiLoginCalls";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const imagePosition = useSharedValue(1);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { isFetching, error, message, currentUser } = useSelector(
    (state) => state.user
  );

  // animation with condition to scale up the background to -height+50 on duration 1s
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height + 50, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  // on click with depending value, change the opacity with duration 0.5s and let the button scale down in 1s
  const buttonAnimetedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  // change image position once the login button is clicked
  const loginStyleHandler = () => {
    imagePosition.value = 0;
    console.log("login pressed");
  };

  // Passing username and password to redux
  const handleLogin = async () => {
    try {
      await login(dispatch, { username, password });
      if (!message && !error) {
        setErr(false);
        console.log("login success");
        navigation.navigate("ArticleMainPage");
      }
      if (error && message) {
        console.log("message!!! ", message);
        setErr(true);
        setErrorMessage(JSON.stringify(message));
      }
    } catch (e) {
      console.log("Error logging in!");
      console.log("catch error logging in: ", e);
      setErr(true);
      setErrorMessage(JSON.stringify(e.response.message))
      console.log("message catch error loggin: " , e.response.message);
    }
  };

  // condition to set login button disabled/enabled
  const handleButton = () => {
    if ((username == "" && password == "") || isFetching) {
      setDisabled(true);
    }
    if (username !== "" && password !== "") {
      setDisabled(false);
    }
  };

  // call handleButton with username and password dependencies
  useEffect(() => {
    handleButton();
  }, [username, password, isFetching]);

  // const { height, width } = Dimensions.get("window");

  return (
    <>
      {isFetching ? (
        <ActivityIndicator
          color="#137DC5"
          size="large"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      ) : (
        <Animated.View style={styles.container}>
          <Animated.View style={[styles.absoluteContainer, imageAnimatedStyle]}>
            <Svg height={height + 100} width={width}>
              <ClipPath id="clipPathId">
                <Ellipse cx={width / 2} rx={height} ry={height + 100} />
              </ClipPath>
              <Image
                // source={require("../../assets/background.png")}
                href={require("../../assets/background.png")}
                width={width + 100}
                height={height + 100}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clipPathId)"
              />
            </Svg>
          </Animated.View>

          <View style={styles.bottomContainer}>
            <Animated.View style={buttonAnimetedStyle}>
              <Pressable
                style={styles.buttonContainer}
                onPress={loginStyleHandler}
              >
                <Text style={styles.buttonLogin}>LOGIN</Text>
              </Pressable>
            </Animated.View>

            <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
              <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                secureTextEntry={false}
              />
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
              />
              <Button
                mode="contained"
                style={styles.buttonSubmit}
                title="Login"
                onPress={() => handleLogin()}
                disabled={disabled}
              >
                LOGIN
              </Button>
            </Animated.View>
          </View>
        </Animated.View>
      )}
      {  err  && <Text style={styles.ErrorMessage}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  ErrorMessage: {
    color: "red",
    position: "absolute",
    fontSize: 20,
    paddingBottom: 250,
    margin: 50,
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  absoluteContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    top: -20,
  },
  buttonContainer: {
    backgroundColor: "#137DC5",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 35,
  },

  buttonLogin: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: "center",
    height: height / 3,
  },
  input: {
    // margin: 10,
    marginHorizontal: width / 10,
    marginVertical: 10,
    height: 50,
    width: 300,
    // borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#137DC5",
    padding: 10,
  },
  buttonSubmit: {
    backgroundColor: "#137DC5",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: width / 10,
    marginVertical: 10,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContainer: {
    marginBottom: height - 90,
    zIndex: -1,
    justifyContent: "center",
  },
});
