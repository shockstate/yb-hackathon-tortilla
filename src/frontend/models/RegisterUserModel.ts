import CarModel from "./CarModel";

interface RegisterUserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  drivingLicenseNumber: string;
  car: CarModel;
}

export default RegisterUserModel;
