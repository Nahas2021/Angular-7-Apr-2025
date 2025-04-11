export interface LoginRequest {
    username: string;
    password: string;
  }
  export interface RegisterData {
    id?: number;
    name: string;
    email: string;
    username: string;
    password: string;
    vehicleNumber: string;
    dateOfBirth: Date;
  }