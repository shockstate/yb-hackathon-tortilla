import React, { Component, ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootStackScreenProps } from "../types";

const HomeScreen = ({
  navigation,
}: RootStackScreenProps<"Home">): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <TouchableOpacity
        onPress={() => navigation.replace("Login")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("SignUp")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Sign up</Text>
      </TouchableOpacity>
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
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
