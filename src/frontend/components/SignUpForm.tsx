import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DateField from "react-native-datefield";
import CarTypeEnum from "../enums/CarTypeEnum";
import RegisterUserModel from "../models/RegisterUserModel";
import { Loading } from "./Loading";

interface RegisterUserFormProps {
  register: (user: RegisterUserModel) => Promise<Response> | undefined;
  loading: boolean;
}

export default function RegisterUserForm({
  register,
  loading,
}: RegisterUserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: RegisterUserModel) => register(data);

  return (
    <View style={styles.form}>
      <View style={styles.separator}>
        <Text style={styles.mainTitle}>SIGN UP</Text>
      </View>
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
              labelDate="Date"
              onSubmit={(value) => {
                onChange(value);
              }}
            />
          </>
        )}
        name="dateOfBirth"
        rules={{
          required: true,
        }}
      />
      {errors.dateOfBirth && (
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
        name="driversLicenseNumber"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.driversLicenseNumber && (
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
              <Text style={styles.label}>Maximum passengers capacity:</Text>
              <Picker
                style={{ height: 40, marginTop: 12 }}
                onValueChange={onChange}
              >
                <Picker.Item
                  value={1}
                  label="Small car - (up to 1 passenger)"
                />
                <Picker.Item
                  value={4}
                  label="Medium car - (up to 4 passengers)"
                />
                <Picker.Item
                  value={5}
                  label="Large car - (5 or more passengers)"
                />
              </Picker>
            </>
          )}
          name="car.maxPassengersCapacity"
          rules={{
            required: true,
          }}
          defaultValue={2}
        />
        {errors.maxPassengersCapacity && (
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
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </View>

      {loading && (
        <View style={{ marginTop: 12 }}>
          <Loading></Loading>
        </View>
      )}
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
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginTop: 30,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "black",
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  errorText: {
    color: "red",
  },
  submitButton: {
    marginTop: 12,
  },
  separator: {
    borderBottomWidth: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
  },
});
