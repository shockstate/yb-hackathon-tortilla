import React from "react";
import { Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import { useAuth } from "../hooks/useAuth";
import SearchModel from "../models/SearchModel";
import TripModel from "../models/TripModel";
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [loading, setLoading] = React.useState(false);
  const [isFinishedResponse, setIsFinishedResponse] = React.useState(false);
  const [tripData, setTripData] = React.useState<TripModel[]>([]);
  const auth = useAuth();

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
          originLatitude: searchModel.originLatitude,
          originLongitude: searchModel.originLongitude,
          destinationLatitude: searchModel.destinationLatitude,
          destinationLongitude: searchModel.destinationLongitude,
          dateTime: searchModel.date,
          userId: auth.authData?.id,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        setTripData(result);
        return result;
      }
      return [] as SearchModel[];
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
      {!isFinishedResponse && <SearchForm search={search} />}

      {isFinishedResponse && (
        <>
          <SearchResult data={tripData} navigation={navigation}></SearchResult>

          <View style={styles.button}>
            <Button
              title="Search again"
              onPress={() => setIsFinishedResponse(false)}
            />
          </View>
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
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginTop: 20,
  },
});
