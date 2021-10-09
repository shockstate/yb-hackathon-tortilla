import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import LoginModel from "../models/LoginModel";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";

interface LoginFormProps {
  login: (email: string, password: string) => Promise<void>;
}

export default function LoginForm({ login }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useAuth();

  const onSubmit = (data: LoginModel) => login(data.email, data.password);

  return (
    <View style={styles.form}>
      <View style={styles.separator}>
        <Text style={styles.mainTitle}>LOGIN</Text>
      </View>
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
      {errors.firstName && (
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
      {errors.firstName && (
        <Text style={styles.errorText}>The password is required.</Text>
      )}

      <View style={styles.submitButton}>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>

      {auth.loading && (
        <View style={{ marginTop: 12 }}>
          <Loading></Loading>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    width: "98%",
    padding: 50,
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
  },
  separator: {
    borderBottomWidth: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "100%",
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
  errorText: {
    color: "red",
  },
  submitButton: {
    marginTop: 12,
  },
});
