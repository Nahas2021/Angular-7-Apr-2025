import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterData } from './login-request';
import { UserGroup } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:44358/api';

  // ✅ Global login status tracker
  public isSignedIn: boolean = false;

  constructor(private http: HttpClient) {}

  // POST request to register a user
  registerUser1(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  getUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(this.baseUrl + '/permissions/usergroups');
  }
  registerUser(userData: RegisterData): Observable<any> {
   // Convert Date to ISO string for the API
   
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
  // GET request to fetch users (example)
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // You can also add login/logout methods that update isSignedIn
  loginUser(loginData: LoginRequest): Observable<string> {

    this.isSignedIn = true;
    
    console.log('User logged in:', loginData);
    return this.http.post(`${this.baseUrl}/login`, loginData, { responseType: 'text' });
  }

  logoutUser() {
    this.isSignedIn = false;
    // Optionally clear token/localStorage here
  }
}
