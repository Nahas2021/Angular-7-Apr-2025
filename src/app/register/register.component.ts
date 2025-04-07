import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  saveForm(): void {
    const formData = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      age: (document.getElementById('age') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      country: (document.getElementById('country') as HTMLSelectElement).value,
    };

    // Simulate API call
    this.saveToApi(formData).then(response => {
      console.log('Form data saved successfully!', response);
    }).catch(error => {
      console.error('Error saving form data:', error);
    });
  }

  private saveToApi(data: any): Promise<any> {
    // Simulated API call using a Promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success response
        resolve({ status: 'success', data });
      }, 1000);
    });
  }
}
