export interface GroceryItem {
    id: number;
    name: string;
    description: string;
    price: number;
    isPhysical: boolean;
    stock: number;  // Add this line for stock
    quantity?: number; // Optional quantity property
  }

  
  export interface BasketItem extends GroceryItem {
    quantity: number;
  }
  