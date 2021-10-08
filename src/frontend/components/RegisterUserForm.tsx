import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CarTypeEnum from "../enums/CarTypeEnum";
import RegisterUserModel from "../models/RegisterUserModel";
import DateField from "react-native-datefield";

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: RegisterUserModel) => console.log(data);

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

      {/* <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <>
            <Text>Car model:</Text>
            <TextInput
              style={styles.input}
              placeholder="Renault"
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
      {errors.car.model && <Text>This field is required.</Text>} */}

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
  errorText: {
    color: "red",
  },
  submitButton: {
    marginTop: 12,
  },
});
