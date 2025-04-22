import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private users: any[] = [];
  private groupPermissions: { [group: string]: string[] } = {};

  constructor(private http: HttpClient) {
    this.loadUserData();
  }

  async loadUserData() {
    this.users = (await this.http.get<any[]>('/assets/users.json').toPromise()) || [];
  
    //this.users = this.http.get('/assets/users.json')
    console.log("usersList----------------"+this.users.length);
    this.groupPermissions = (await this.http.get<{ [group: string]: string[] }>('../../assets/groups.json').toPromise()) || {};
    console.log("group permissions---------"+this.groupPermissions);
  }

  login(username: string, password: string): boolean {
    
    const user = this.users.find(u => u.username === username);
   console.log("userList----------------"+user.username);
    if (user && password === 'password') {
      localStorage.setItem(this.tokenKey, btoa(JSON.stringify(user)));
      return true;
    }
    return false;
  }

  getUserGroup(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;
    const decoded = JSON.parse(atob(token));
    return decoded.group || null;
  }

  getUserRoles(): string[] {
    const group = this.getUserGroup();
    return group ? this.groupPermissions[group] || [] : [];
  }

  hasAnyRole(allowedRoles: string[]): boolean {
    const roles = this.getUserRoles();
    return allowedRoles.some(role => roles.includes(role));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}

