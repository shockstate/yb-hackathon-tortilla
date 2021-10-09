import PassengerTypeEnum from "../enums/PassengerStatus";
import RecurrencyEnum from "../enums/RecurrencyEnum";

interface TripModel {
  id: string;
  originDescription: string;
  originLatitude: number;
  originLongitude: number;
  destinationDescription: string;
  destinationLatitude: string;
  destinationLongitude: string;
  dateTime: Date;
  isUserPassenger: boolean;
  originDistanceInMeters: number;
  destinationDistanceInMeters: number;
  passengerStatus: PassengerTypeEnum;
}

export default TripModel;
