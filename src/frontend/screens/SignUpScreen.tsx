import React, { ReactElement, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Loading } from "../components/Loading";
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
          birthDate: user.birthDate,
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
      <Text style={styles.title}>Sign Up</Text>

      <SignUpForm register={register} />
      {loading && <Loading></Loading>}

      <TouchableOpacity
        onPress={() => navigation.replace("Home")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go back</Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
