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
    const orderId = this.basketService.placeOrder({
      fullName: this.fullName,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode
    });

    this.router.navigate(['/confirmation', orderId]);
  }
}
