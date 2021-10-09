import React, { ReactElement, useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { Api } from "../constants/Api";
import RegisterUserModel from "../models/RegisterUserModel";

import { RootStackScreenProps } from "../types";

const SignUpScreen = ({
  navigation,
}: RootStackScreenProps<"SignUp">): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [hasRegistrationError, setHasRegistrationError] =
    useState<boolean>(false);

  const register = async (user: RegisterUserModel) => {
    setLoading(true);
    try {
      const response = await fetch(`${Api.URL}/User/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          dateOfBirth: user.dateOfBirth,
          driversLicenseNumber: user.driversLicenseNumber,
          car: {
            model: user.car.model,
            year: user.car.year,
            maxCapacity: user.car.maxCapacity,
            carType: user.car.carType,
          },
        }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.replace("Login");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 35,
          paddingTop: 35,
        }}
      >
        <SignUpForm register={register} />
        <Text>
          Already have an account? Go to{" "}
          <Text
            onPress={() => navigation.replace("Login")}
            style={styles.login}
          >
            LOGIN
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  login: {
    color: "#2196F3",
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
