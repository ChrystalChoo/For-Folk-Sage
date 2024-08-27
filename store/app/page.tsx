'use client';

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfoPageContent from '@/components/InfoPageContent'
import { Product } from '@/components/CollectionsPage'

export default function InfoPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  const [cart, setCart] = React.useState<Product[]>([]);
  const [wishlist, setWishlist] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); /* ... */ };
  const handleLogout = () => { /* ... */ };
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); /* ... */ };
  const removeFromCart = (productId: string) => { /* ... */ };
  const removeFromWishlist = (productId: string) => { /* ... */ };

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
      <InfoPageContent />
      <Footer />
    </div>
  )
}