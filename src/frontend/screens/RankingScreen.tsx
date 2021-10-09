import * as React from "react";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
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

  const getRandomImage = () => {
    var chosen = Math.floor(Math.random() * 6);
      switch(chosen){
        case 0:
          return <Image source={require("../assets/images/img0.png")} style={{ width: 150, height: 150 }} />
        case 1:
          return <Image source={require("../assets/images/img1.png")} style={{ width: 150, height: 150 }} />
        case 2:
          return <Image source={require("../assets/images/img2.png")} style={{ width: 150, height: 150 }} />
        case 3:
          return <Image source={require("../assets/images/img3.png")} style={{ width: 150, height: 150 }} />
        case 4:
          return <Image source={require("../assets/images/img4.png")} style={{ width: 150, height: 150 }} />
        default:
          return <Image source={require("../assets/images/img5.png")} style={{ width: 150, height: 150 }} />
      }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Ranking of best Carless people</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {usersRanking.map((user, index) => (
          <View style={styles.item}>
            {index === 0 ? (
              <Text style={styles.medal}>🥇</Text>
            ) : index === 1 ? (
              <Text style={styles.medal}>🥈</Text>
            ) : index === 2 ? (
              <Text style={styles.medal}>🥉</Text>
            ) : (
              <Text style={{ marginRight: 44 }} />
            )}
            {getRandomImage()}
            <Text style={styles.field}>{user.firstName}</Text>{" "}
            <Text style={styles.field}>{user.lastName}</Text>
            <Text style={styles.field}>
              CO<Text style={{ fontSize: 10 }}>2</Text> points:{" "}
              {user.totalCo2Saved}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
  },
  field: {
    fontSize: 18,
    marginRight: 10,
    flex: 1,
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
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 65,
    width: "100%",
    justifyContent: "center",
    marginVertical: 8,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 2, height: 2 }, //0 6
    shadowRadius: 10,
    flex: 1,
  },
  medal: {
    fontSize: 20,
    marginRight: 15,
  },
});
