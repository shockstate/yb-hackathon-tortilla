import CarTypeEnum from "../enums/CarTypeEnum";
import CarModel from "./CarModel";

interface RegisterUserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  driversLicenseNumber: string;
  car: CarModel;
}

export default RegisterUserModel;
