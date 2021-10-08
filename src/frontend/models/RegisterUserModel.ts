import CarTypeEnum from "../enums/CarTypeEnum";
import CarModel from "./CarModel";

interface RegisterUserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  drivingLicenseNumber: string;
  car: CarModel;
  //   car: {
  //     model: string;
  //     year: string;
  //     maxCapacity: string;
  //     carType: CarTypeEnum;
  //   };
}

export default RegisterUserModel;
