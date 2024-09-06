'use client';

import React, { useState, useEffect, useCallback } from 'react'
import { Search, User, ShoppingBag, Heart, ChevronDown, X, Star, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Newsletter from '@/components/Newsletter'
import UserGeneratedContent from '@/components/UserGeneratedContent'
import ProductGrid from '@/components/ProductGrid'
import ProductDetails from '@/components/ProductDetails'

// Update the Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  sizes: string[];
  color?: string;
  category?: string;
}

// Define a separate CartItem interface
export type CartItem = Product & { quantity: number };

export default function CollectionsPage() {
  // Implement a basic cart functionality
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };
  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [filterSize, setFilterSize] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);

  const products: Product[] = [
    { id: '1', name: 'Less Whine, More Wine Tee Mystery Box', price: 125, image: '/product images/8.png', rating: 4.5, reviews: 28, sizes: ['XS', 'S', 'M', 'L', 'XL'], color: 'White', category: 'T-Shirts' },
    { id: '2', name: 'Less Whine, More Wine Sweater Mystery Box', price: 185, image: '/product images/9.png', rating: 4.2, reviews: 15, sizes: ['S', 'M', 'L', 'XL'], color: 'Gray', category: 'Sweaters' },
    { id: '3', name: 'Mindfulness Journal', price: 55, image: '/product images/10.png', rating: 4.8, reviews: 42, sizes: ['One Size'], color: 'Beige', category: 'Accessories' },
    { id: '4', name: 'Organic Cotton Cap', price: 65, image: '/product images/11.png', rating: 4.0, reviews: 10, sizes: ['S/M', 'L/XL'], color: 'Black', category: 'Accessories' },
    { id: '5', name: 'Eco-friendly Yoga Mat', price: 80, image: '/product images/12.png', rating: 4.7, reviews: 33, sizes: ['Standard'], color: 'Green', category: 'Fitness' },
  ];

  useEffect(() => {
    let result = products;

    if (filterColor) {
      result = result.filter(product => product.color === filterColor);
    }

    if (filterSize) {
      result = result.filter(product => product.sizes.includes(filterSize));
    }

    if (filterCategory) {
      result = result.filter(product => product.category === filterCategory);
    }

    if (sortBy) {
      switch (sortBy) {
        case 'price-low-high':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          // Assuming the products array is already sorted by newest first
          break;
      }
    }

    setFilteredProducts(result);
    setIsFiltered(filterColor !== null || filterSize !== null || filterCategory !== null || sortBy !== null);
  }, [filterColor, filterSize, filterCategory, sortBy]);

  const userGeneratedContent = [
    { id: 1, username: '@naturelover', content: 'Loving my new Sage Linen Shirt! #ForFolkSage', image: '/placeholder.svg?height=300&width=300' },
    { id: 2, username: '@yogaenthusiast', content: 'This eco-friendly yoga mat is a game-changer! 🧘‍♀️ #SustainableLiving', image: '/placeholder.svg?height=300&width=300' },
    { id: 3, username: '@mindfulliving', content: 'Starting my day with the Mindfulness Journal. So grateful! ✨ #SelfCare', image: '/placeholder.svg?height=300&width=300' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prevWishlist => {
      const existingIndex = prevWishlist.findIndex(item => item.id === product.id);
      if (existingIndex !== -1) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for: ${searchQuery}`)
  }

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeProductDetails = () => {
    setSelectedProduct(null)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Subscribed with email: ${email}`)
    setEmail('')
  }

  const clearFilters = () => {
    setFilterColor(null);
    setFilterSize(null);
    setFilterCategory(null);
    setSortBy(null);
  }

  useEffect(() => {
    console.log('Wishlist updated:', wishlist);
  }, [wishlist]);

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
        wishlist={wishlist}
        cart={cart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        removeFromCart={removeFromCart}
        removeFromWishlist={removeFromWishlist}
        updateCartItemQuantity={updateCartItemQuantity}
        cartTotal={cartTotal}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#113108] mb-4 md:mb-0">Collection</h2>
          <div className="flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm border-[#113108] text-[#113108]">
                  Filter <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Color</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => setFilterColor('White')}>White</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterColor('Gray')}>Gray</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterColor('Black')}>Black</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterColor('Beige')}>Beige</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterColor('Green')}>Green</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Size</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => setFilterSize('XS')}>XS</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('S')}>S</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('M')}>M</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('L')}>L</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('XL')}>XL</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('One Size')}>One Size</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('S/M')}>S/M</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('L/XL')}>L/XL</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterSize('Standard')}>Standard</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => setFilterCategory('T-Shirts')}>T-Shirts</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterCategory('Sweaters')}>Sweaters</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterCategory('Accessories')}>Accessories</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFilterCategory('Fitness')}>Fitness</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm border-[#113108] text-[#113108]">
                  Sort <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setSortBy('price-low-high')}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy('price-high-low')}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy('newest')}>Newest</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isFiltered && (
              <Button variant="outline" className="text-sm border-[#113108] text-[#113108]" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          openProductDetails={openProductDetails}
          updateQuantity={updateCartItemQuantity}
          wishlist={wishlist}
        />
      </main>

      <ProductDetails
        selectedProduct={selectedProduct}
        closeProductDetails={closeProductDetails}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlist={wishlist}
      />

      <UserGeneratedContent content={userGeneratedContent} />
      <Newsletter
        email={email}
        setEmail={setEmail}
        handleSubscribe={handleSubscribe}
      />
      <Footer />
    </div>
  )
}