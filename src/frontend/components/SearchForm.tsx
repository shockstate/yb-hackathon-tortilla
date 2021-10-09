import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import DateField from "react-native-datefield";
import SearchModel from "../models/SearchModel";

interface SearchFormProps {
  search: (user: SearchModel) => Promise<Response> | undefined;
}

export default function SearchForm({ search }: SearchFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: SearchModel) => {
    console.log(data, "data on submit");
    data.originLatitude = data.origin.split(",")[0];
    data.originLongitude = data.origin.split(",")[1];
    data.destinationLatitude = data.destination.split(",")[0];
    data.destinationLongitude = data.destination.split(",")[1];
    return search(data);
  };

  return (
    <ScrollView style={styles.form}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Origin:</Text>
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
        <Text style={styles.errorText}>Origin is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Destination:</Text>
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
        defaultValue="46.96271204384958,7.465173447017116"
      />
      {errors.destination && (
        <Text style={styles.errorText}>Destination is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Date:</Text>
            <DateField
              styleInput={styles.dateInput}
              onSubmit={(value) => {
                onChange(value);
              }}
            />
          </>
        )}
        name="date"
        rules={{
          required: true,
        }}
      />
      {errors.date && (
        <Text style={styles.errorText}>The date is required.</Text>
      )}

      <View style={styles.submitButton}>
        <Button title="Search" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
    display: "flex",
    justifyContent: "center",
  },
  form: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
  },
  dateInput: {
    fontSize: 15,
    padding: 12,
    width: "32%",
    marginTop: 12,
    borderWidth: 1,
  },
  label: {
    marginTop: 12,
  },
  addCar: {
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
  },
  errorText: {
    color: "red",
  },
  submitButton: {
    marginTop: 12,
  },
});
