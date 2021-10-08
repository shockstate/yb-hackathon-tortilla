import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  return (
    <View style={styles.container}>
      <Text>This is my thirs tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
