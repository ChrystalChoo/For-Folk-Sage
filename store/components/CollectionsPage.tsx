'use client';

import React, { useState, useEffect } from 'react'
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
import { useCart } from '@/context/CartContext';

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
  quantity: number;
}

export default function CollectionsPage() {
  const { cart, addToCart, removeFromCart, updateCartItemQuantity, cartTotal } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [email, setEmail] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filterColor, setFilterColor] = useState<string | null>(null)
  const [filterSize, setFilterSize] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [isFiltered, setIsFiltered] = useState(false)

  const products: Product[] = [
    { id: '1', name: 'Less Whine, More Wine Tee Mystery Box', price: 125, image: '/product images/6.png', rating: 4.5, reviews: 28, sizes: ['XS', 'S', 'M', 'L', 'XL'], color: 'White', category: 'T-Shirts', quantity: 1 },
    { id: '2', name: 'Less Whine, More Wine Sweater Mystery Box', price: 185, image: '/product images/3.png', rating: 4.2, reviews: 15, sizes: ['S', 'M', 'L', 'XL'], color: 'Gray', category: 'Sweaters', quantity: 1 },
    { id: '3', name: 'Mindfulness Journal', price: 55, image: '/product images/2.png', rating: 4.8, reviews: 42, sizes: ['One Size'], color: 'Beige', category: 'Accessories', quantity: 1 },
    { id: '4', name: 'Organic Cotton Cap', price: 65, image: '/product images/5.png', rating: 4.0, reviews: 10, sizes: ['S/M', 'L/XL'], color: 'Black', category: 'Accessories', quantity: 1 },
    { id: '5', name: 'Eco-friendly Yoga Mat', price: 80, image: '/product images/5.png', rating: 4.7, reviews: 33, sizes: ['Standard'], color: 'Green', category: 'Fitness', quantity: 1 },
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

  const addToWishlist = (product: Product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product])
    }
    setIsWishlistOpen(true)
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.id !== productId))
  }

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

  const updateQuantity = (productId: string, newQuantity: number) => {
    setFilteredProducts(filteredProducts.map(product => 
      product.id === productId ? { ...product, quantity: newQuantity } : product
    ));
  }

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
          updateQuantity={updateQuantity}
        />
      </main>

      <ProductDetails
        selectedProduct={selectedProduct}
        closeProductDetails={closeProductDetails}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        updateQuantity={updateQuantity}
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