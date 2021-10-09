import TripRecurrency from "../enums/TripRecurrency";

interface CreateTripModel {
  originLatitude: string;
  originLongitude: string;
  destinationLatitude: string;
  destinationLongitude: string;
  startDateTime: Date;
  tripRecurrency: TripRecurrency;
  userId: string;
}

export default CreateTripModel;
