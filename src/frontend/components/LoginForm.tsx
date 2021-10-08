import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CarTypeEnum from "../enums/CarTypeEnum";
import RegisterUserModel from "../models/RegisterUserModel";
import DateField from "react-native-datefield";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: RegisterUserModel) => console.log(data);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>First name:</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="firstName"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.firstName && (
        <Text style={styles.errorText}>The first name is required.</Text>
      )}
      <View style={styles.submitButton}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
    border: "1px solid",
    width: "32%",
    marginTop: 12,
  },
  label: {
    marginTop: 12,
  },
  addCar: {
    border: "1px solid",
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
  },
  carType: {
    height: 40,
    maringTop: 12,
  },
  errorText: {
    color: "red",
  },
  submitButton: {
    marginTop: 12,
  },
});
