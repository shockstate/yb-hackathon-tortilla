import React, { Component, ReactElement } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackScreenProps } from "../types";
import logo from "../assets/images/logo.png";

const HomeScreen = ({
  navigation,
}: RootStackScreenProps<"Home">): ReactElement => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 257, height: 59 }} />

      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.link}>
        <Button title="Login" onPress={() => navigation.replace("Login")} />
      </View>

      <View style={styles.link}>
        <Button title="Sign up" onPress={() => navigation.replace("SignUp")} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  link: {
    marginTop: 15,
    width: 80,
  },
});
