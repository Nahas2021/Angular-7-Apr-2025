import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {  RegisterData } from '../shared/login-request';
import {  ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    // ✅ Initialize the form group here
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ✅ This getter allows you to use "f.email", "f.phone" in your HTML
  get f() {
    return this.registrationForm.controls;
  }

  // In your Angular component
formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  onSubmit1111() {
    if (this.registrationForm.valid) {

      console.log('Form Data:', this.registrationForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

  onSubmit() {

    if (this.registrationForm.valid) {

     
      // Usage in onSubmit()
const rawDate = new Date(this.registrationForm.value.dateOfBirth);
const formattedDate = this.formatDateLocal(rawDate);
      const dob = new Date(this.registrationForm.get('dob')?.value || new Date());
      dob.setDate(dob.getDate() + 1); // Add one day to the date

      const regData: RegisterData = {
        id: 0,
        name: 'Default Name', // Replace with actual logic to get the name
        email: this.registrationForm.get('email')?.value || '',
        username: this.registrationForm.get('email')?.value || '',
        password: this.registrationForm.get('password')?.value || '',
        vehicleNumber: '12345',
        dateOfBirth: dob // Use the updated date
      };

      const formData = this.registrationForm.value;
      const userData = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth)
      };
      
 
console.log('User Data:', userData);
      console.log('Registration Data:', regData);
      console.log('Registration Form:', this.registrationForm.value);

      this.api.registerUser(regData).subscribe({
        next: (response) => {
          
          // Redirect to login or success page
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
         console.error('Registration error:', error);
        }
      });
    }
  }
}
