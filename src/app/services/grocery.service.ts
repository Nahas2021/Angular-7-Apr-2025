import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroceryItem } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private groceries: GroceryItem[] = [
    { id: 1, name: 'Milk', description: 'The best of cows', price: 2.5, isPhysical: true, stock: 10 },
    { id: 2, name: 'Bread', description: 'Easy toast', price: 1.75, isPhysical: true, stock: 20 },
    { id: 3, name: 'Eggs', description: 'Wild chicken', price: 3.0, isPhysical: true, stock: 30 },
    { id: 4, name: 'EasyGroceries Loyalty Membership', description: 'Get 20% discount', price: 5.0, isPhysical: false, stock: 0 }
  ];

  constructor() {}

  getGroceries(): Observable<GroceryItem[]> {
    return of(this.groceries);
  }
}
