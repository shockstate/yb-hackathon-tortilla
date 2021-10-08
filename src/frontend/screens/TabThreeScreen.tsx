import * as React from "react";
import { View, Text } from "react-native";
import RegisterUserForm from "../components/RegisterUserForm";
import { RootTabScreenProps } from "../types";

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  return (
    <View>
      <Text>This is my thirs tab</Text>
      <RegisterUserForm />
    </View>
  );
}
