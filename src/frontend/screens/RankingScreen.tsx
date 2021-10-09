import * as React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
} from "react-native";
import logo from "../assets/images/profile.png";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import { useAuth } from "../hooks/useAuth";
import UserRankingModel from "../models/UserRankingModel";

export default function ModalScreen() {
  const auth = useAuth();
  const [usersRanking, setUsersRanking] = useState<UserRankingModel[]>([]);
  useEffect(() => {
    getUserRankingAsync();
  }, []);

  const getUserRankingAsync = async () => {
    try {
      fetch(`${Api.URL}/User/ranking`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setUsersRanking(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>      
      <Text style={styles.title}>Ranking of best Carless people</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {
        usersRanking.map(user => (
          <View>
            <Text style={styles.field}>{user.firstName}</Text>
            <Text style={styles.field}>{user.lastName}</Text>
            <Text style={styles.field}>{user.totalCo2Saved}</Text>
            <Image source={logo} style={{ width: 25, height: 25 }} />
          </View>
        ))
      }
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
