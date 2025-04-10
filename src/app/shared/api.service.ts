import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7170/api';

  // ✅ Global login status tracker
  public isSignedIn: boolean = false;

  constructor(private http: HttpClient) {}

  // POST request to register a user
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // GET request to fetch users (example)
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // You can also add login/logout methods that update isSignedIn
  loginUser(data: any): Observable<any> {
    this.isSignedIn = true;
    console.log('User logged in:', data);

    const loginData = {
      username: data.email,
      password: data.password
    };

    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  logoutUser() {
    this.isSignedIn = false;
    // Optionally clear token/localStorage here
  }
}
