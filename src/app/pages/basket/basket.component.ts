import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { BasketItem } from '../../models/types';
import { FormsModule } from '@angular/forms';
import { GroceryItem } from '../../models/types'; // Ensure this path is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // The selector is the name of the component in HTML
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  totalAmount: number = 0; // Declare the property with an initial value
  //basketItems: any[] = [];
  items: GroceryItem[] = [];
  hasMembership: boolean = false; // Declare the property with a default value
  constructor(public basketService: BasketService,private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
    this.items = this.basketService.getItems();
    this.hasMembership = this.basketService.hasMembership();
    this.calculateTotal();
  }

  calculateTotal(): void {
    let total = 0;
    this.items.forEach(item => {
      total += item.price * (item.quantity ?? 0);
    });

    if (this.hasMembership) {
      total = total * 0.8; // Apply 20% discount
    }

    this.totalAmount = total;
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }


  get basketItems(): BasketItem[] {
    return this.basketService.getBasket();
  }

  loadItems(): void {
    this.items = this.basketService.getItems();
  }

  getTotal(): number {
    return this.basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem1111(id: number): void {
    console.log('Removing item with ID:', id);
    this.basketService.removeItem(id);
    // No need to assign to basketItems, as it is a getter
    this.basketService.getItems();
    console.log('Updated basket items:', this.basketItems);
  }
    removeItem(id: number): void {
    console.log('Removing item with ID:', id);
    this.basketService.removeItem(id);
    this.loadItems(); // Refresh after removal
    console.log('Updated basket items:', this.basketItems);
  }

  increaseQty(item: any): void {
    item.quantity++;
    this.basketService.updateItem(item.id, item.quantity);
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.basketService.updateItem(item.id, item.quantity);
    }
  }
}
