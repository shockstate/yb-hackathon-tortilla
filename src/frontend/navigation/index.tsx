import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import Notifications from "../screens/Notifications";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import {} from "../contexts/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../components/Themed";
import { useAuth } from "../hooks/useAuth";
import CreateTripModal from "../components/CreateTripModal";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [userData, setUserData] = React.useState(null);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator userData={userData} />
    </NavigationContainer>
  );
};

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(userData: any) {
  const { authData, loading } = useAuth();

  return (
    <Stack.Navigator>
      {!authData ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "Sign in",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="Create Trip Modal"
              component={CreateTripModal}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const auth = useAuth();
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "My Trips",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerRight: () => (
            <>
              <TouchableOpacity onPress={() => auth.signOut()}>
                <Text>Log out</Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  cursor: "pointer",
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="user"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={Notifications}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <CalendarTabIcon name="notification" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

function OfferTabIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function BookTabIcon(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  color: string;
}) {
  return <Entypo size={30} style={{ marginBottom: -3 }} {...props} />;
}

function CalendarTabIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default Navigation;
