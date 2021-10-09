import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import PassengerStatus from "../enums/PassengerStatus";
import { useAuth } from "../hooks/useAuth";
import PassengerModel from "../models/PassengerModel";
import Moment from "moment";

export default function NotificationsScreen() {
  const [loading, setLoading] = React.useState(false);
  const auth = useAuth();
  const [passengers, setPassengers] = React.useState<PassengerModel[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [snackbarText, setSnackBarText] = React.useState("");


  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    getUserNotifications();
  }, []);

  const getUserNotifications = async () => {
    var id = auth.authData?.id;
    if (id) {
      
    }
    try {
      fetch(`${Api.URL}/Passenger/pendings?userId=${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setPassengers(data));
    } catch (error) {
      console.error(error);
    }
  };
  const onClick = async (tripId: string, passengerId: string,  isAccepted: boolean) => {
    console.log(isAccepted);
    try {
      var index = passengers.findIndex((i) => i.dayTripId == tripId);
      if (index > -1) {
        var aux = passengers.slice(0);
        aux.splice(index, 1);
        setPassengers(aux);
      }
      const response = await fetch(`${Api.URL}/Passenger/${passengerId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAccepted: isAccepted,
        }),
      });
      console.log(response);
      if (response.status == 405) {
        setSnackBarText("The user doesn't have enough points");
        setVisible(true);
      }
      if (response.status == 200 && isAccepted) {
        setSnackBarText("Trip was accepted succesfully");
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Requests to join your trips:</Text>
      <View style={styles.container}>
        {passengers.map((i, index) =>
            <View key={index} style={styles.item}>
              <View style={styles.notificationInfo}>
                <Text>
                  From <Text style={styles.bold}>{i.originDescription}</Text> to{" "}
                  <Text style={styles.bold}>{i.destinationDescription}</Text>, {Moment(i.dateTime).format("MMMM Do YYYY}")} at{" "}
                  {Moment(i.dateTime).format("h:mm")}
                </Text>
                <Text>
                  <Text style={styles.bold}>
                    {i.userFirstName} {i.userLastName}
                  </Text>{" "}
                  wants to join
                </Text>
              </View>
              <View style={styles.icons}>
                <View style={styles.containerIconLeft}>
                  <Text>Decline:</Text>
                  <MaterialIcons
                    style={styles.iconLeft}
                    onClick={() => onClick(i.dayTripId, i.passengerId, false)}
                    name="clear"
                    size={30}
                    color="black"
                  />
                </View>
                <View style={styles.containerIconRight}>
                  <Text>Accept:</Text>
                  <MaterialIcons
                    style={styles.iconRight}
                    onClick={() => onClick(i.dayTripId, i.passengerId, true)}
                    name="check"
                    size={30}
                    color="black"
                  />
                </View>
              </View>
            </View>
        )}
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {snackbarText}
      </Snackbar>
    </View>
  );
}

function GetIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "98%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationInfo: {
    width: "60%",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  containerIconLeft: {
    marginRight: 15,
  },
  iconLeft: {
    color: "#F41E1E",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
  },
  containerIconRight: {
    marginLeft: 15,
  },
  iconRight: {
    color: "#0F9D58",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    width: "100%",
    justifyContent: "center",
    marginVertical: 8,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 2, height: 2 }, //0 6
    shadowRadius: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});
