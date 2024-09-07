import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

type ShopContextType = {
  cart: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    console.log('Initial load from localStorage:', { savedCart, savedFavorites });
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    console.log('Saving to localStorage:', { cart, favorites });
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [cart, favorites]);

  const addToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    setCart(prevCart => {
      const newCart = [...prevCart, product];
      console.log('New cart state:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    console.log('Removing from cart:', productId);
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      console.log('New cart state:', newCart);
      return newCart;
    });
  };

  const toggleFavorite = (product: Product) => {
    console.log('Toggling favorite:', product);
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(item => item.id === product.id);
      let newFavorites;
      if (isFavorite) {
        newFavorites = prevFavorites.filter(item => item.id !== product.id);
      } else {
        newFavorites = [...prevFavorites, product];
      }
      console.log('New favorites state:', newFavorites);
      return newFavorites;
    });
  };

  return (
    <ShopContext.Provider value={{ cart, favorites, addToCart, removeFromCart, toggleFavorite }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}