import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Loading = () => {
  return (
    <View>
      <ActivityIndicator color={"#000"} animating={true} size="small" />
    </View>
  );
};
