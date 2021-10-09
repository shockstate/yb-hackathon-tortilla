import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component, ReactElement, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginForm from "../components/LoginForm";

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
      <LoginForm login={login} />

      <Text>
        Don't have an account yet? Go to{" "}
        <Text
          onPress={() => navigation.replace("SignUp")}
          style={styles.signUp}
        >
          SIGN UP
        </Text>
      </Text>

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
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: 10,
  },
});
