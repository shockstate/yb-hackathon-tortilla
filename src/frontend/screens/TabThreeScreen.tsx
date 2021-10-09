import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { List } from 'react-native-paper';

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  return (
    <View style={styles.container}>
    </View>
    // <View style={styles.container}>
    //     {/* <List.Item
    //       title="First Item"
    //       description="Item description"
    //       right={props => <List.Icon {...props} icon="folder" />}
    //     /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
