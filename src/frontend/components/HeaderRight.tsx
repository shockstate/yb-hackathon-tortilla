import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackScreenProps } from "../types";

interface HeaderRightProps {
  navigation: any;
}

export default function HeaderRight({ navigation }: HeaderRightProps) {
  const colorScheme = useColorScheme();
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("Ranking")}
        style={({ pressed }) => ({
          cursor: "pointer",
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
      <Pressable
        onPress={() => navigation.navigate("Account")}
        style={({ pressed }) => ({
          cursor: "pointer",
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
    </>
  );
}
