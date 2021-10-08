import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CarTypeEnum from "../enums/CarTypeEnum";
import RegisterUserModel from "../models/RegisterUserModel";
import DateField from "react-native-datefield";
import { Picker } from "@react-native-picker/picker";
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

  const onSubmit = (data: SearchModel) => search(data);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Origin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Origin"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="origin"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.origin && (
        <Text style={styles.errorText}>Origin is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Destination:</Text>
            <TextInput
              style={styles.input}
              placeholder="Destination"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="destination"
        rules={{
          required: true,
        }}
        defaultValue=""
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
    </View>
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
