// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { LoginRequest } from '../shared/login-request';
import { AuthService } from '../services/auth.service';

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

 constructor(private router: Router,private api: ApiService,private auth: AuthService) {}


 onSubmit1111() {
  // if (this.auth.login(this.username, this.password)) {
  //   this.router.navigate(['/dashboard']);
  // } else {
  //   this.error = 'Invalid credentials';
  // }
}

  onSubmit() {
   

    if (this.loginForm.valid) {
      
      const loginData: LoginRequest = {
        username: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || ''
      };
       if (this.auth.login(loginData.username, loginData.password)) {
    this.router.navigate(['/permission-tree']);
  }else{
    alert('Invalid credentials');
  }
      // this.api.loginUser(loginData).subscribe({
      //   next: (res) => {

      // if (res === 'Login successful!') {
      //   // Navigate to home page (or any route you define as home)
      //   this.router.navigate(['/home']);
      // }

      //     console.log('Login successful:', res);
          
      //   },
      //   error: (err) => {
      //     console.error('Login failed:', err);
      //    // this.message = 'Login failed: ' + err.error;
      //   }
      // });
    }
  }

  redirectToRegister(): void {
    // Navigate to the register page
    this.router.navigate(['/register']);
  }
  
  // Add this method to the LoginComponent class

}