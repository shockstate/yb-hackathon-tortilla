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

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Last name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="lastName"
        defaultValue=""
        rules={{
          required: true,
        }}
      />
      {errors.lastName && (
        <Text style={styles.errorText}>The last name is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Birthdate:</Text>
            <DateField
              styleInput={styles.dateInput}
              onSubmit={(value) => {
                onChange(value);
              }}
            />
          </>
        )}
        name="birthdate"
        rules={{
          required: true,
        }}
      />
      {errors.birthdate && (
        <Text style={styles.errorText}>The birthdate is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="test@accenture.ch"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="email"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorText}>The email is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="password"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorText}>The password is required.</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Driving license number:</Text>
            <TextInput
              style={styles.input}
              placeholder="12PSG10"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          </>
        )}
        name="drivingLicenseNumber"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.drivingLicenseNumber && (
        <Text style={styles.errorText}>
          The driving licence number is required.
        </Text>
      )}

      <View style={styles.addCar}>
        <Text style={styles.title}>Add your car</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text style={styles.label}>Car model:</Text>
              <TextInput
                style={styles.input}
                placeholder="Renault twingo"
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                }}
                value={value}
              />
            </>
          )}
          name="car.model"
          rules={{
            required: true,
          }}
          defaultValue=""
        />
        {errors.model && (
          <Text style={styles.errorText}>The car model is required.</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text style={styles.label}>Registration year:</Text>
              <TextInput
                style={styles.input}
                placeholder="2018"
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                }}
                value={value}
              />
            </>
          )}
          name="car.year"
          rules={{
            required: true,
          }}
          defaultValue=""
        />
        {errors.year && (
          <Text style={styles.errorText}>
            The registration year is required.
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text style={styles.label}>Maximum capacity:</Text>
              <TextInput
                style={styles.input}
                placeholder="4"
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                }}
                value={value}
              />
            </>
          )}
          name="car.maxCapacity"
          rules={{
            required: true,
          }}
          defaultValue=""
        />
        {errors.maxCapacity && (
          <Text style={styles.errorText}>
            The maximum capacity is required.
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text style={styles.label}>Car type:</Text>
              <Picker
                style={{ height: 40, marginTop: 12 }}
                onValueChange={onChange}
              >
                <Picker.Item value="None" label="None" />
                <Picker.Item value={CarTypeEnum.DIESEL} label="Diesel" />
                <Picker.Item value={CarTypeEnum.GASOLINE} label="Gasoline" />
                <Picker.Item value={CarTypeEnum.HYBRID} label="Hybrid" />
                <Picker.Item value={CarTypeEnum.ELECTRIC} label="Electric" />
              </Picker>
            </>
          )}
          name="car.carType"
          rules={{
            required: true,
          }}
          defaultValue=""
        />
        {errors.carType && (
          <Text style={styles.errorText}>The car type is required.</Text>
        )}
      </View>

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
