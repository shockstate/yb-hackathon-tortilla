import { Ionicons } from "@expo/vector-icons";
import Moment from "moment";
import React from "react";
import { Pressable, StatusBar, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import TripModel from "../models/TripModel";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const auth = useAuth();
  const [tripsData, setTripsData] = React.useState<TripModel[]>([]);

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
        <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          name={item.isUserPassenger ? "people" : "key"}
          color={Colors.light.tint}
        />
        <View style={styles.iconSeparator}></View>
        <Text>
          {item.isUserPassenger ? "Passenger" : "Driver"}
          {item.isUserPassenger
            ? " - Reservation status: " + item.passengerStatus
            : ""}
        </Text>
      </Text>

      <Text style={styles.cardTitle}>
        <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          name="time"
          color={Colors.light.tint}
        />
        <View style={styles.iconSeparator}></View>
        <Text>{Moment(item.dateTime).format("MMMM Do YYYY, h:mm:ss a")}</Text>
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: TripModel }) => <Item item={item} />;

  const onRefresh = () => {
    getUserTrips();
  };

  const getUserTrips = async () => {
    const data = await fetch(
      `${Api.URL}/Trip/myTrips?userId=${auth.authData?.id}`
    )
      .then((response) => response.json())
      .then((json) => {
        setTripsData(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
    setTripsData(data);
  };

  React.useEffect(() => {
    getUserTrips();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips</Text>
      <View>
        <Pressable
          onPress={() => navigation.navigate("CreateTripModal")}
          style={({ pressed }) => ({
            cursor: "pointer",
            opacity: pressed ? 0.5 : 1,
            marginTop: 20,
          })}
        >
          <Ionicons name="add-circle-sharp" size={30} color="#2F95DC" />
        </Pressable>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={tripsData}
        renderItem={renderItem}
        keyExtractor={(item: TripModel) => item.id}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
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
