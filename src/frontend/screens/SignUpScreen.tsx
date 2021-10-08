import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RegisterUserForm from "../components/RegisterUserForm";

import { RootStackScreenProps } from "../types";

const SignUpScreen = ({
  navigation,
}: RootStackScreenProps<"SignUp">): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <RegisterUserForm />

      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
