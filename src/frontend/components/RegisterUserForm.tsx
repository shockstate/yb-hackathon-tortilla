import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CarTypeEnum from "../enums/CarTypeEnum";
import RegisterUserModel from "../models/RegisterUserModel";
import CarModel from "../models/CarModel";

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const [userData, setUserData] = useState<RegisterUserModel>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date(),
    password: "",
    drivingLicenseNumber: "",
    car: {
      model: "",
      year: "",
      maxCapacity: "",
      carType: CarTypeEnum.ELECTRIC,
    },
  });

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>First name:</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              onBlur={onBlur}
              onChangeText={(value) => {
                setUserData({ ...userData, firstName: value });
              }}
              value={value}
            />
          </>
        )}
        name="firstName"
        defaultValue=""
      />
      {errors.firstName && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <>
            <Text>Last name</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              onBlur={onBlur}
              onChangeText={(value) => {
                setUserData({ ...userData, lastName: value });
              }}
              value={value}
            />
          </>
        )}
        name="lastName"
        defaultValue=""
      />
      {errors.lastName && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="test@accenture.ch"
              onBlur={onBlur}
              onChangeText={(value) => {
                setUserData({ ...userData, email: value });
              }}
              value={value}
            />
          </>
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <>
            <Text>Password:</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => {
                setUserData({ ...userData, password: value });
              }}
              value={value}
            />
          </>
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <>
            <Text>Driving license number:</Text>
            <TextInput
              style={styles.input}
              placeholder="12PSG10"
              onBlur={onBlur}
              onChangeText={(value) => {
                setUserData({ ...userData, drivingLicenseNumber: value });
              }}
              value={value}
            />
          </>
        )}
        name="drivingLicenseNumber"
        defaultValue=""
      />
      {errors.drivingLicenseNumber && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <>
            <Text>Car model:</Text>
            <TextInput
              style={styles.input}
              placeholder="12PSG10"
              onBlur={onBlur}
              onChangeText={(value) => {
                setUserData({
                  ...userData,
                  car: {
                    ...userData.car,
                    model: value,
                  },
                });
              }}
              value={value}
            />
          </>
        )}
        name="model"
        defaultValue=""
      />
      {errors.car.model && <Text>This field is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
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
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});
