import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dashboard</h2>
    <p>Logged in as: {{ auth.getUserRoles() }}</p>
    <a routerLink="/admin">Go to Admin Page</a><br>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}

  logout(): void {
    this.auth.logout();
    window.location.reload();
  }
}
