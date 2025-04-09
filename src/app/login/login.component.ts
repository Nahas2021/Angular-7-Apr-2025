// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule], // <-- Add this
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login successful', this.loginForm.value);
      this.router.navigate(['/home']);
    }
  }
}