// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { LoginRequest } from '../shared/login-request';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule], // <-- Add this
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  age: number | null = null;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

 constructor(private router: Router,private api: ApiService) {}

  onSubmit() {
   

    if (this.loginForm.valid) {
      
      const loginData: LoginRequest = {
        username: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || ''
      };
      this.api.loginUser(loginData).subscribe({
        next: (res) => {

      if (res === 'Login successful!') {
        // Navigate to home page (or any route you define as home)
        this.router.navigate(['/home']);
      }

          console.log('Login successful:', res);
          
        },
        error: (err) => {
          console.error('Login failed:', err);
         // this.message = 'Login failed: ' + err.error;
        }
      });
    }

 
  }
  
  // Add this method to the LoginComponent class

}