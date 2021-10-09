import PassengerStatus from "../enums/PassengerStatus";

interface PassengerModel {
  userFirstName: string;
  userLastName: string;
  originDescription: string;
  destinationDescription: string;
  dateTime: Date;
  dayTripId: string;
  passengerId: string;
}

export default PassengerModel;
