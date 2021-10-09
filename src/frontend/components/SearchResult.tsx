import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Button, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Api } from "../constants/Api";

import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import TripModel from "../models/TripModel";
import { RootTabScreenProps } from "../types";
import { Text, View } from "./Themed";

export default function SearchResult(
  data: any,
  { navigation }: RootTabScreenProps<"TabTwo">
) {
  const auth = useAuth();

  const Item = ({ item }: { item: TripModel }) => (
    <View style={styles.item}>
      <Text style={styles.cardTitle}>
        <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          name="car-outline"
          color={Colors.light.tint}
        />
        <View style={styles.iconSeparator}></View>
        <Text>{item.originDescription}</Text>
      </Text>

      <Text style={styles.cardTitle}>
        <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          name="car"
          color={Colors.light.tint}
        />
        <View style={styles.iconSeparator}></View>
        <Text>{item.destinationDescription}</Text>
      </Text>

      <Text style={styles.cardTitle}>
        <Text>Distance to origin (meters)</Text>
        <View style={styles.iconSeparator}></View>
        <Text>{item.originDistanceInMeters}</Text>
      </Text>

      <Text style={styles.cardTitle}>
        <Text>Distanc to destination (meters)</Text>
        <View style={styles.iconSeparator}></View>
        <Text>{item.destinationDistanceInMeters}</Text>
      </Text>

      <Text style={styles.cardTitle}>
        <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          name="time"
          color={Colors.light.tint}
        />
        <View style={styles.iconSeparator}></View>
        <Text>{moment(item.dateTime).format("MMMM Do YYYY, h:mm:ss a")}</Text>
      </Text>

      <Button title="Request" onPress={() => createRequest(item.id)} />
    </View>
  );

  const createRequest = async (tripId: string) => {
    try {
      const response = await fetch(`${Api.URL}/trip/request`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dayTripId: tripId,
          userId: auth.authData?.id,
        }),
      });
      if (response.ok) {
        alert("Requested OK");
        navigation.navigate("TabOne");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: { item: TripModel }) => <Item item={item} />;
  console.log(data, "data is");
  return (
    <View>
      <Text style={styles.title}>Your search results</Text>

      {data && data.data.length == 0 && (
        <Text style={styles.subTitle}>
          No trips to show =( No worries! You can still save the planet 🌍🌿
        </Text>
      )}
      {data && data.data.length > 0 && (
        <>
          <FlatList
            data={data.data}
            renderItem={renderItem}
            keyExtractor={(item: TripModel) => item.id}
          />
        </>
      )}
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  iconSeparator: {
    width: 10,
  },
  cards: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    height: 180,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 2, height: 2 }, //0 6
    shadowRadius: 10,
  },
  subTitle: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "left",
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: "space-mono",
    color: "#fff",
    textAlign: "center",
  },
  cardIcon: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
