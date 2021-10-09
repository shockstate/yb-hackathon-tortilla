import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import SearchModel from "../models/SearchModel";
import TripModel from "../models/TripModel";

export default function TabTwoScreen() {
  const [loading, setLoading] = React.useState(false);
  const [isFinishedResponse, setIsFinishedResponse] = React.useState(false);
  const [tripData, setTripData] = React.useState<TripModel>();

  const search = async (searchModel: SearchModel) => {
    setLoading(true);
    try {
      const response = await fetch(`${Api.URL}/trip/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: searchModel.origin,
          destination: searchModel.destination,
          date: searchModel.date,
        }),
      });
      setTripData(await response.json());
      return response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsFinishedResponse(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where would you like to go?</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {!isFinishedResponse && <SearchForm search={search}></SearchForm>}

      {isFinishedResponse && (
        <>
          <SearchResult></SearchResult>

          <TouchableOpacity onPress={() => setIsFinishedResponse(false)}>
            <Text>Search again</Text>
          </TouchableOpacity>
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
});
