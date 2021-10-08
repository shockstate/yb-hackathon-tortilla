import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component, ReactElement, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";

const LoginScreen = (): ReactElement => {
  const auth = useAuth();
  const [hasLoginError, setHasLoginError] = useState<boolean>(false);

  const login = async () => {
    await auth.signIn("test@test.com", "test"); //ToDo: pass data from forms

    setHasLoginError(!auth.authData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the login</Text>

      <TouchableOpacity onPress={() => login()} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>

      {auth.loading && <Loading></Loading>}

      {hasLoginError && (
        <Text style={styles.title}>Cannot login you at the moment =(</Text>
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
});
