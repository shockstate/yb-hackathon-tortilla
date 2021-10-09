import CarTypeEnum from "../enums/CarTypeEnum";

interface CarModel {
  model: string;
  year: string;
  maxPassengersCapacity: string;
  carType: CarTypeEnum;
}

export default CarModel;
