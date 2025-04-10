// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

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
      console.log('Login successful', this.loginForm.value);
      this.api.loginUser(this.loginForm.value);
      this.router.navigate(['/register']);
    }
  }
  
  // Add this method to the LoginComponent class

}