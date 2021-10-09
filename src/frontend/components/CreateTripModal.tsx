import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
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
  const [createTrip, setCreateTrip] = useState<CreateTripModel>({
    originLatitude: "",
    originLongitude: "",
    destinationLatitude: "",
    destinationLongitude: "",
    startDateTime: new Date(),
    tripRecurrency: TripRecurrency.EVERYWORKDAY,
    userId: "",
  });

  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const createTripCall = async (createTrip: CreateTripModel) => {
    console.log("createTrip", createTrip);
    // setLoading(true);
    try {
      const response = await fetch(`${Api.URL}/trip`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originLatitude: createTrip.originLatitude,
          originLongitude: createTrip.originLongitude,
          destinationLatitude: createTrip.destinationLatitude,
          destinationLongitude: createTrip.destinationLongitude,
          startDateTime: createTrip.startDateTime,
          tripRecurrency: createTrip.tripRecurrency,
          userId: auth.authData?.id,
        }),
      });
      return response.json();
    } catch (error) {
      //   setLoading(false);
      console.log(error);
    } finally {
      //   setLoading(false);
      navigation.replace("Home");
    }
  };

  return (
    <>
      <View style={styles.mainCcontainer}>
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
                  <Text style={styles.label}>Origin Latitude</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                  />
                </>
              )}
              name="originLatitude"
              rules={{
                required: true,
              }}
              defaultValue=""
            />
            {errors.originLatitude && (
              <Text style={styles.errorText}>
                The origin latitude is required.
              </Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>Origin Longitude</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                  />
                </>
              )}
              name="originLongitude"
              rules={{
                required: true,
              }}
              defaultValue=""
            />
            {errors.originLongitude && (
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
                  <Text style={styles.label}>Destination Latitude</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                  />
                </>
              )}
              name="destinationLatitude"
              rules={{
                required: true,
              }}
              defaultValue=""
            />
            {errors.destinationLatitude && (
              <Text style={styles.errorText}>
                The destination latitude is required.
              </Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.label}>Destination Longitude</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                  />
                </>
              )}
              name="destinationLongitude"
              rules={{
                required: true,
              }}
              defaultValue=""
            />
            {errors.destinationLongitude && (
              <Text style={styles.errorText}>
                The destination longitude is required.
              </Text>
            )}
          </View>

          <View style={styles.modalView}>
            <Text style={styles.title}>When will you travel?</Text>

            <View style={{ width: "100%" }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
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
              render={({ field: { onChange, onBlur, value } }) => (
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

          {/* {loading && (
            <View style={{ marginTop: 12 }}>
              <Loading></Loading>
            </View>
          )} */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainCcontainer: {
    flex: 1,
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
