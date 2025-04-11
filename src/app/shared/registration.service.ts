// services/registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  id?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  vehicleNumber: string;
  dateOfBirth: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'https://your-api-endpoint.com/api/register'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterData): Observable<any> {
    // Convert Date to ISO string for the API
    const dataToSend = {
      ...userData,
      dateOfBirth: userData.dateOfBirth.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
    return this.http.post(this.apiUrl, dataToSend);
  }
}