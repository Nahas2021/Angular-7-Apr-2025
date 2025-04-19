import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { BasketItem } from '../../models/types';
import { FormsModule } from '@angular/forms';
import { GroceryItem } from '../../models/types'; // Ensure this path is correct

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // The selector is the name of the component in HTML
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  //basketItems: any[] = [];
  items: GroceryItem[] = [];
  constructor(public basketService: BasketService) {}

  ngOnInit(): void {
    this.loadItems();
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
