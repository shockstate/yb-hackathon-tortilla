import TripRecurrency from "../enums/TripRecurrency";

interface CreateTripModel {
  origin: string;
  originLatitude: string;
  originLongitude: string;
  destination: string;
  destinationLatitude: string;
  destinationLongitude: string;
  startDateTime: Date;
  tripRecurrency: TripRecurrency;
  userId: string;
}

export default CreateTripModel;
