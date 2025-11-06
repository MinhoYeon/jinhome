'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnimalCharacter } from '../types/character';

export interface CartItem {
  character: AnimalCharacter;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (character: AnimalCharacter) => void;
  removeFromCart: (characterId: string) => void;
  updateQuantity: (characterId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (character: AnimalCharacter) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.character.id === character.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.character.id === character.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { character, quantity: 1 }];
    });
  };

  const removeFromCart = (characterId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.character.id !== characterId)
    );
  };

  const updateQuantity = (characterId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(characterId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.character.id === characterId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.character.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
