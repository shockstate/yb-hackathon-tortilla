import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component, ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList, RootStackScreenProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keys } from "../constants/keys";
import { useAuth } from "../hooks/useAuth";

const storeUserData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(Keys.USER_STORE_KEY, jsonValue);
  } catch (e) {
    alert("something went wrong");
    console.error(e);
  }
};

const LoginScreen = ({
  navigation,
}: RootStackScreenProps<"Login">): ReactElement => {
  const auth = useAuth();

  const login = (
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">
  ) => {
    auth.signIn();
    alert("Signed in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the login</Text>

      <TouchableOpacity onPress={() => login(navigation)} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
