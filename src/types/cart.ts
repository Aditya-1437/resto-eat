export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  prepTime: number; // Minutes to cook
  deliveryTime: number; // Total time including courier travel
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
