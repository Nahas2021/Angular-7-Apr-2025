import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <h2>Admin Panel</h2>
    <p>Only accessible to users with 'admin' role.</p>
  `
})
export class AdminComponent {}
// This component is a simple Angular component that displays an "Admin Panel" message.
// It is intended to be used as a protected route in an Angular application.