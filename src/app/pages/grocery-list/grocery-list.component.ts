import { Component, OnInit } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroceryService } from '../../services/grocery.service';
import { BasketService } from '../../services/basket.service';
import { GroceryItem } from '../../models/types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  groceries: GroceryItem[] = [];
  quantities: { [key: number]: number } = {};

  constructor(
    private groceryService: GroceryService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.groceryService.getGroceries().subscribe(items => {
      this.groceries = items;
      items.forEach(item => this.quantities[item.id] = 1);
    });
  }

  addToBasket(item: GroceryItem): void {
    const quantity = this.quantities[item.id] || 1;
    this.basketService.addToBasket(item, quantity);
    alert(`${quantity} x ${item.name} added to basket`);
  }
   // Add trackItem function here
   trackItem(index: number, item: GroceryItem): number {
    return item.id;  // Return the unique ID of the item to track changes efficiently
  }
}
