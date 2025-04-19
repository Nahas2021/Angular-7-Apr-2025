import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  fullName = '';
  address = '';
  city = '';
  postalCode = '';
  includeMembership = false;

  constructor(
    private basketService: BasketService,
    private router: Router
  ) {}

  get total(): number {
    return this.basketService.getTotal(this.includeMembership);
  }

  submitOrder() {
    this.basketService.setMembership(this.includeMembership);
    if (this.fullName && this.address) {
      // Logic for order processing, save order, etc.
      const orderId = this.basketService.placeOrder({
        fullName: this.fullName,
        address: this.address,
        city: this.city,
        postalCode: this.postalCode
      });
  
      //this.router.navigate(['/confirmation', orderId]);
      // After successful checkout, navigate to shipping slip
      this.router.navigate(['/shipping-slip/123']); // Order ID should be dynamic
    } else {
      alert('Please fill in all shipping details!');
    }
    
  }
}
