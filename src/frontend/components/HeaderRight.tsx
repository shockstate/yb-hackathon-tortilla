import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackScreenProps } from "../types";

interface HeaderRightProps {
  navigation: any;
}

export default function HeaderRight({ navigation }: HeaderRightProps) {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Pressable
          onPress={() => navigation.navigate("Ranking")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name="trophy"
            size={30}
            color="#2F95DC"
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("Account")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name="user"
            size={30}
            color="#2F95DC"
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>
    </View>
  );
}
