import React, { useState } from "react";
import { StyleSheet, TextInput, Modal } from "react-native";
import { Text, View } from "../components/Themed";
import DateField from "react-native-datefield";
import CreateTrip from "../models/CreateTrip";
import TripRecurrency from "../enums/TripRecurrency";
import { Picker } from "@react-native-picker/picker";

export default function TabTwoScreen() {
  const [createTrip, setCreateTrip] = useState<CreateTrip>({
    originLatitude: "",
    originLongitude: "",
    destinationLatitude: "",
    destinationLongitude: "",
    startDateTime: new Date(),
    tripRecurrency: TripRecurrency.EVERYWORKDAY,
    userId: "",
  });

  const [step, setStep] = useState(1);

  const nextPage = () => {
    setStep((step) => step + 1);
  };

  const previousPage = () => {
    setStep((step) => step - 1);
  };

  const allSteps = [
    {
      name: "step 1",
      component: (
        <>
          <Text style={styles.title}>Where do you leave from?</Text>

          <Text>Origin Latitude</Text>
          <TextInput
            onChangeText={(value) => {
              setCreateTrip({ ...createTrip, originLatitude: value });
            }}
            value={createTrip.originLatitude}
          />

          <Text>Origin Longitude</Text>
          <TextInput
            onChangeText={(value) => {
              setCreateTrip({ ...createTrip, originLongitude: value });
            }}
            value={createTrip.originLongitude}
          />
        </>
      ),
    },
    {
      name: "step 2",
      component: (
        <>
          <Text style={styles.title}>Where will you arrive?</Text>

          <Text>Destination Latitude</Text>
          <TextInput
            onChangeText={(value) => {
              setCreateTrip({ ...createTrip, destinationLatitude: value });
            }}
            value={createTrip.destinationLatitude}
          />

          <Text>Destination Longitude</Text>
          <TextInput
            onChangeText={(value) => {
              setCreateTrip({ ...createTrip, destinationLongitude: value });
            }}
            value={createTrip.destinationLongitude}
          />
        </>
      ),
    },
    {
      name: "step 3",
      component: (
        <>
          <Text style={styles.title}>When will you travel?</Text>

          <DateField
            // styleInput={styles.dateInput}
            onSubmit={(value) => {
              setCreateTrip({ ...createTrip, startDateTime: value });
            }}
          />
        </>
      ),
    },
    {
      name: "step 4",
      component: (
        <>
          <Text style={styles.title}>What will be the frequency?</Text>
          <Picker
            onValueChange={(value: TripRecurrency) => {
              setCreateTrip({ ...createTrip, tripRecurrency: value });
            }}
          >
            <Picker.Item value={TripRecurrency.NONE} label="None" />
            <Picker.Item value={TripRecurrency.EVERYWORKDAY} label="None" />
            <Picker.Item value={TripRecurrency.EVERYDAY} label="None" />
          </Picker>
        </>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View></View>
      </Modal>
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
