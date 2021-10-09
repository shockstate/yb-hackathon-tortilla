import PassengerStatus from "../enums/PassengerStatus";

interface PassengerModel {
  userFirstName: string;
  userLastName: string;
  from: string;
  to: string;
  dayTrip: Date;
  tripId: string;
  passengerStatus: PassengerStatus;
}

export default PassengerModel;
