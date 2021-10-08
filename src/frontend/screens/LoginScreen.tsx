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
      <Text>
        You don't have an account? Go to{" "}
        <Text
          onPress={() => navigation.replace("SignUp")}
          style={styles.signUp}
        >
          SIGN UP
        </Text>
      </Text>

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
  signUp: {
    color: "#2196F3",
  },
  loginFailed: {
    fontWeight: "bold",
  },
  errorMessage: {
    backgroundColor: "#EAD7D7",
    color: "#BA6A68",
    border: "1px solid #C69194",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 6,
    paddingRight: 6,
  },
});
