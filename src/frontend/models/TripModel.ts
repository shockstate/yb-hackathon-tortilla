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
  isUserPassanger: boolean;
  originDistanceInMeters: number;
  destinationDistanceInMeters: number;
}

export default TripModel;
