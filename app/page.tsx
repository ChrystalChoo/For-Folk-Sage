'use client';

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfoPageContent from '@/components/InfoPageContent'
import { Product } from '@/types'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsLoggedIn(true);
    // Implement actual login logic
  };

  const handleLogout = () => { 
    setIsLoggedIn(false);
    // Implement actual logout logic
  };

  const handleSearch = (e: React.FormEvent) => { 
    e.preventDefault(); 
    // Implement search functionality
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Header 
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isWishlistOpen={isWishlistOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        updateCartItemQuantity={updateCartItemQuantity}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        removeFromWishlist={removeFromWishlist}
      />
      <main>
        <InfoPageContent 
          cart={cart}
          removeFromCart={removeFromCart}
          updateCartItemQuantity={updateCartItemQuantity}
        />
        {/* Removed sections for Our Mission, Our Values, and Our Concept */}
      </main>
      <Footer />
    </div>
  )
}