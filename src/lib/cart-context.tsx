"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/cart";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentTime: Date;
  totalItems: number;
  maxDeliveryTime: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock initial data
const INITIAL_MOCK_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Truffle Mushroom Pizza",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
    quantity: 1,
    prepTime: 15,
    deliveryTime: 30,
  }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_MOCK_ITEMS);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate the max delivery time in the cart
  const maxDeliveryTime = items.length > 0 
    ? Math.max(...items.map(i => i.deliveryTime)) 
    : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        isOpen,
        setIsOpen,
        currentTime,
        totalItems,
        maxDeliveryTime,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
