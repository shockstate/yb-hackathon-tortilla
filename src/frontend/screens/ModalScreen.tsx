import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import logo from "../assets/images/profile.png";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import { useAuth } from "../hooks/useAuth";
import UserDetails from "../models/UserDetailsModel";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ModalScreen() {
  const auth = useAuth();
  const [user, setUser] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    driversLicenseNumber: "",
    totalCo2Saved: 0,
    points: 0,
  });
  useEffect(() => {
    if (auth.authData?.email) {
      getUserAsync(auth.authData?.email);
    }
  }, []);

  const getUserAsync = async (email: string) => {
    try {
      fetch(`${Api.URL}/User?email=${email}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <Button title="Logout" onPress={() => auth.signOut()} color="#F41E1E" />
      </View>

      <Image source={logo} style={{ width: 150, height: 150 }} />
      <Text style={styles.title}>Personal information</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.field}>{user.firstName}</Text>
      <Text style={styles.field}>{user.lastName}</Text>
      <Text style={styles.field}>{user.email}</Text>
      <Text style={styles.field}>
        {user.dateOfBirth != ""
          ? new Date(user?.dateOfBirth).getDay() +
            "/" +
            new Date(user?.dateOfBirth).getMonth() +
            "/" +
            new Date(user?.dateOfBirth).getFullYear()
          : ""}
      </Text>
      <Text style={styles.field}>{user.driversLicenseNumber}</Text>

      {/* <Text style={styles.title}>Car information</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{user?.lastName}</Text>
      <Text style={styles.title}>{user?.lastName}</Text> */}

      <Text style={styles.title}>Puntuation</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.field}>Points Balance: {user?.points}</Text>
      <Text style={styles.field}>
        CO2 Saved with Carles: {user?.totalCo2Saved}
      </Text>
      {user.totalCo2Saved > 100 ? (
        <Text style={styles.recommendation}>
          Great job! You are saving this planet
        </Text>
      ) : (
        <Text style={styles.recommendation}>
          Work harder to make a better world!
        </Text>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
  },
  field: {
    fontSize: 18,
    textAlign: "left",
  },
  recommendation: {
    fontSize: 18,
    textAlign: "left",
    fontStyle: "italic",
    color: "green",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  logout: {
    position: "absolute",
    right: 12,
    top: 12,
    cursor: "pointer",
  },
});
