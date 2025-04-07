import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true, // Ensure it is a standalone component
  template: `
    <h2>Welcome to Home Page</h2>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
