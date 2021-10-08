import TripRecurrency from "../enums/TripRecurrency";

interface CreateTrip {
  originLatitude: string;
  originLongitude: string;
  destinationLatitude: string;
  destinationLongitude: string;
  startDateTime: Date;
  tripRecurrency: TripRecurrency;
  userId: string;
}

export default CreateTrip;
