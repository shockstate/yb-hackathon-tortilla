import CarTypeEnum from "../enums/CarTypeEnum";

interface CarModel {
  model: string;
  year: string;
  maxCapacity: string;
  carType: CarTypeEnum;
}

export default CarModel;
