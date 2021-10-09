import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import TripRecurrency from "../enums/TripRecurrency";
import CreateTripModel from "../models/CreateTripModel";
import DateField from "react-native-datefield";
import { Picker } from "@react-native-picker/picker";
import { Api } from "../constants/Api";
import { useAuth } from "../hooks/useAuth";
import { RootStackScreenProps } from "../types";
import { Controller, useForm } from "react-hook-form";
import { Loading } from "./Loading";

export default function CreateTripModal({
  navigation,
}: RootStackScreenProps<"Create Trip Modal">) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const createTripCall = async (createTrip: CreateTripModel) => {
    console.log("createTrip", createTrip);
    setLoading(true);
    try {
      const response = await fetch(`${Api.URL}/trip`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originLatitude: createTrip.origin.split(",")[0],
          originLongitude: createTrip.origin.split(",")[1],
          destinationLatitude: createTrip.destination.split(",")[0],
          destinationLongitude: createTrip.destination.split(",")[1],
          startDateTime: createTrip.startDateTime,
          tripRecurrency: createTrip.tripRecurrency,
          userId: auth.authData?.id,
        }),
      });
      return response.json();
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
      navigation.replace("Home");
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.separator}>
            <Text style={styles.mainTitle}>CREATE A TRIP</Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.title}>Where do you leave from?</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>Origin</Text>
                  <Picker
                    style={{ height: 40, marginTop: 12 }}
                    onValueChange={onChange}
                  >
                    <Picker.Item
                      value="46.96271204384958,7.465173447017116"
                      label="Young Boys Stadium"
                    />
                    <Picker.Item
                      value="41.389010291692514,2.174671157358779"
                      label="iSolutions Bcn"
                    />
                    <Picker.Item
                      value="47.451322893438046,8.568351419942868"
                      label="isolutions Zurich"
                    />
                    <Picker.Item
                      value="45.977109747365404,7.658709362053811"
                      label="Matterhorn"
                    />
                    <Picker.Item
                      value="47.54473437449549,7.589980336081139"
                      label="iSolutions Basel"
                    />
                  </Picker>
                </>
              )}
              name="origin"
              rules={{
                required: true,
              }}
              defaultValue="46.96271204384958,7.465173447017116"
            />
            {errors.origin && (
              <Text style={styles.errorText}>
                The origin latitude is required.
              </Text>
            )}
          </View>

          <View style={styles.modalView}>
            <Text style={styles.title}>Where will you arrive?</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>Destination</Text>
                  <Picker
                    style={{ height: 40, marginTop: 12 }}
                    onValueChange={onChange}
                  >
                    <Picker.Item
                      value="46.96271204384958,7.465173447017116"
                      label="Young Boys Stadium"
                    />
                    <Picker.Item
                      value="41.389010291692514,2.174671157358779"
                      label="iSolutions Bcn"
                    />
                    <Picker.Item
                      value="47.451322893438046,8.568351419942868"
                      label="isolutions Zurich"
                    />
                    <Picker.Item
                      value="45.977109747365404,7.658709362053811"
                      label="Matterhorn"
                    />
                    <Picker.Item
                      value="47.54473437449549,7.589980336081139"
                      label="iSolutions Basel"
                    />
                  </Picker>
                </>
              )}
              name="destination"
              rules={{
                required: true,
              }}
              defaultValue="41.389010291692514,2.174671157358779"
            />
            {errors.destination && (
              <Text style={styles.errorText}>
                The destination latitude is required.
              </Text>
            )}
          </View>

          <View style={styles.modalView}>
            <Text style={styles.title}>When will you travel?</Text>

            <View style={{ width: "100%" }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateField
                    styleInput={styles.dateInput}
                    onSubmit={(value) => {
                      onChange(value);
                    }}
                  />
                )}
                name="startDateTime"
                rules={{
                  required: true,
                }}
              />
            </View>
            {errors.startDateTime && (
              <Text style={styles.errorText}>The date is required.</Text>
            )}
          </View>

          <View style={styles.modalView}>
            <Text style={styles.title}>What will be the frequency?</Text>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Picker
                    style={{ height: 40, marginTop: 12, width: "100%" }}
                    onValueChange={(value: TripRecurrency) => {
                      onChange(value);
                    }}
                  >
                    <Picker.Item value={TripRecurrency.NONE} label="None" />
                    <Picker.Item
                      value={TripRecurrency.EVERYWORKDAY}
                      label="Every working days"
                    />
                    <Picker.Item
                      value={TripRecurrency.EVERYDAY}
                      label="Every days"
                    />
                  </Picker>
                </>
              )}
              name="tripRecurrency"
              rules={{
                required: true,
              }}
              defaultValue=""
            />
            {errors.tripRecurrency && (
              <Text style={styles.errorText}>The frequency is required.</Text>
            )}
          </View>

          <View style={styles.submitButton}>
            <Button
              title="Create Trip"
              onPress={handleSubmit(createTripCall)}
            />
          </View>

          {loading && (
            <View style={{ marginTop: 12 }}>
              <Loading></Loading>
            </View>
          )}
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
  },
  container: {
    width: "90%",
    borderWidth: 1,
    padding: 50,
    borderRadius: 5,
  },
  modalView: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  dateInput: {
    fontSize: 15,
    padding: 12,
    width: "32%",
    marginTop: 12,
    borderWidth: 1,
  },
  submitButton: {
    marginTop: 12,
  },
  errorText: {
    color: "red",
  },
  label: {
    marginTop: 12,
  },
  separator: {
    borderBottomWidth: 1,
    alignItems: "center",
    marginBottom: 30,
  },
});
