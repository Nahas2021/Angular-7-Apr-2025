import { Injectable } from '@angular/core';
import { BasketItem, GroceryItem } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
    private basket: BasketItem[] = [];
    private includeLoyalty = false;
    private orders: any[] = [];
    //private items: any[] = [];
    private items: GroceryItem[] = [];

    setMembership(include: boolean): void {
      this.includeLoyalty = include;
    }
  
    hasMembership(): boolean {
      return this.includeLoyalty;
    }
  
    getBasket(): BasketItem[] {
      return this.basket;
    }
  
    getTotal(includeMembership = this.includeLoyalty): number {
      let total = 0;
      for (const item of this.basket) {
        const discount = includeMembership && item.isPhysical ? 0.8 : 1;
        total += item.price * item.quantity * discount;
      }
  
      if (includeMembership) total += 5; // £5 for loyalty
      return total;
    }
  
    addToBasket(item: GroceryItem, quantity: number): void {
      const existing = this.basket.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.basket.push({
          ...item,
          quantity,
          isPhysical: item.name !== 'EasyGroceries Loyalty Membership'
        });
      }
    }
  
    getOrderById(id: number): any {
        return this.orders.find(order => order.orderId === id);
      }
      getItems(): GroceryItem[] {
        return this.items;
      }
      // getItems() {
      //   return this.items;
      // }
      
      // removeItem(id: number) {
      //   this.items = this.items.filter(item => item.id !== id);
      // }
      
      // removeItem(id: number): void {
      //   const index = this.items.findIndex(item => item.id === id);
      //   if (index !== -1) {
      //     this.items.splice(index, 1); // directly modifies the array
      //   }
      // }
      // removeItem(id: number): void {
      //   console.log('Removing item with id:', id);
      //   this.items = this.items.filter(item => item.id !== id);
      //   console.log('Remaining items:', this.items);
      // }

      removeItem(id: number): void {
        console.log('Removing item with id:', id);
        this.basket = this.basket.filter(item => item.id !== id);
        console.log('Remaining basket items:', this.basket);
      }
      
      updateItem(id: number, quantity: number) {
        const item = this.items.find(item => item.id === id);
        if (item) item.quantity = quantity;
      }

    placeOrder(shippingInfo: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
      }): number {
        const orderId = Math.floor(Math.random() * 1000000);
      
        const order = {
          customerId: 35496,
          orderId,
          shippingInfo,
          items: [...this.basket],
          hasLoyalty: this.includeLoyalty,
          total: this.getTotal()
        };
      
        this.orders.push(order); // ✅ store the order
        console.log('✅ Order Placed:', order);
      
        this.basket = [];
        this.includeLoyalty = false;
      
        return orderId;
      }
      
  }
  
// This service manages the basket, including adding/removing items and calculating the total price.
// It also checks if the user has a loyalty membership and applies discounts accordingly.
// The basket is an array of items, each with a quantity.
// The service provides methods to add items to the basket, remove them, clear the basket, and get the total price.
// The total price is calculated based on whether the user has a loyalty membership.
// The service is provided in the root injector, making it available throughout the application.
// The basket is an array of items, each with a quantity.
// The service provides methods to add items to the basket, remove them, clear the basket, and get the total price.
// The total price is calculated based on whether the user has a loyalty membership.
