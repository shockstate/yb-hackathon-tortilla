import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { List, Snackbar } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { Api } from "../constants/Api";
import PassengerStatus from "../enums/PassengerStatus";
import PassengerModel from "../models/PassengerModel";
import TripModel from "../models/TripModel";

export default function Notifications() {
  const [loading, setLoading] = React.useState(false);
  const [passengers, setPassengers] = React.useState(mockPassengers);
  const [visible, setVisible] = React.useState(false);
  const [snackbarText, setSnackBarText] = React.useState("");


  const onDismissSnackBar = () => setVisible(false);
  const onClick = async (tripId: string, isAccepted : boolean) => {
    console.log(isAccepted);
    try {
      var index = passengers.findIndex(i => i.tripId == tripId);
      if(index > -1) {
        var aux = passengers.slice(0);
        aux.splice(index, 1)
        setPassengers(aux);
      }
      const response = await fetch(`${Api.URL_localhost}/Passenger/${tripId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAccepted: isAccepted
        }),
      });
      console.log(response);
      if (response.status == 405){
        setSnackBarText("The user doesn't have enough points");
        setVisible(true);
      }
      if (response.status == 200 && isAccepted){
        setSnackBarText("Trip was accepted succesfully");
        setVisible(true);
      }
    } catch (error) {
      
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests to join your trips:</Text>
      {
        passengers.length > 0 ?
          passengers.map((i, index)=>(
              i.passengerStatus == PassengerStatus.Pending ?
              <List.Item
              key={index}
              title={`From ${i.from} to ${i.to}, ${i.dayTrip.getDay()}/${i.dayTrip.getMonth()}/${i.dayTrip.getFullYear()} at ${i.dayTrip.getHours()}:${i.dayTrip.getMinutes()}`}
              description={`${i.userFirstName} ${i.userLastName} wants to join"`}
              right={_ => 
                <>
                  <MaterialIcons style={styles.iconLeft} onClick={() => onClick(i.tripId, false)} name="clear" size={24} color='black'/>
                  <MaterialIcons style={styles.iconRight} onClick={() => onClick(i.tripId, true)} name="check" size={24} color='black'/>
                </>
              }
              />
              : 
              <></>
          ))
        :
        <Text>You have no requests... Create new trips to get new ones!</Text>
        }
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
          {snackbarText}
      </Snackbar>
    </View>
  );
}

const mockPassengers : PassengerModel[] = [{
  userFirstName: "jabalina",
  userLastName: "potulapiz",
  from: "spain",
  to: "guadalupe",
  dayTrip: new Date(),
  passengerStatus: PassengerStatus.Pending,
  tripId: '00000000-0000-0000-0000-000000000000'
},{
  userFirstName: "telias",
  userLastName: "marinera",
  from: "switzerlina",
  to: "freeburguer",
  dayTrip: new Date(),
  passengerStatus: PassengerStatus.Pending,
  tripId: '00000000-0000-0000-0000-000000000000'
}]

function GetIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  iconLeft: {
    marginLeft: 10,
    marginTop: 10
  },
  iconRight: {
    marginTop: 10
  },
});
