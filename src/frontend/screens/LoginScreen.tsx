import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component, ReactElement, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginForm from "../components/LoginForm";
import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";
import { RootStackScreenProps } from "../types";

const LoginScreen = ({
  navigation,
}: RootStackScreenProps<"Login">): ReactElement => {
  const auth = useAuth();
  const [hasLoginError, setHasLoginError] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    await auth.signIn(email, password);

    setHasLoginError(!auth.authData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <LoginForm login={login} />

      <TouchableOpacity
        onPress={() => navigation.replace("Home")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go back</Text>
      </TouchableOpacity>

      {auth.loading && <Loading></Loading>}

      {hasLoginError && (
        <Text style={styles.errorMessage}>
          <Text style={styles.loginFailed}>Login Failed:</Text> Wrong
          credentials
        </Text>
      )}
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
  loginFailed: {
    fontWeight: "bold",
  },
  errorMessage: {
    backgroundColor: "#EAD7D7",
    color: "#BA6A68",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 6,
    paddingRight: 6,
  },
});
