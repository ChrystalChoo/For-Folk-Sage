import React from 'react'
import Link from 'next/link'
import Image from 'next/image'  // Add this import
import { Search, User, ShoppingBag, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Product } from './CollectionsPage';

// Remove these imports and define the types locally
// import { useCart } from '@/hooks/useCart'
// import { Product } from '@/types/Product'

// Create a separate CartItem type
type CartItem = Product & { quantity: number };

// Update the Cart interface
interface Cart {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
}

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogin: (e: React.FormEvent) => void;
  handleLogout: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
  wishlist: Product[];
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  cartTotal: number;
  removeFromCart: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

export default function Header({
  isLoggedIn,
  handleLogin,
  handleLogout,
  isCartOpen,
  setIsCartOpen,
  isWishlistOpen,
  setIsWishlistOpen,
  wishlist,
  cart,
  searchQuery,
  setSearchQuery,
  handleSearch,
  removeFromCart,
  removeFromWishlist,
  updateCartItemQuantity,
  cartTotal,
}: HeaderProps) {
  const categories = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/collections' },
    { name: 'Community', href: '/community' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Folks', href: '/folks' }
  ]

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <nav>
          <ul className="flex space-x-6 text-sm uppercase tracking-wider">
            {categories.map((category) => (
              <li key={category.name}>
                <Link href={category.href} className="hover:text-[#113108]">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/" className="text-2xl font-semibold uppercase tracking-widest text-[#113108] whitespace-nowrap">
          For Folk Sage
        </Link>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="w-40 rounded-full border-stone-200 bg-stone-50 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="h-5 w-5 text-[#113108]" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-[#113108]" />
                <span className="sr-only">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Saves</DropdownMenuItem>
                  <DropdownMenuItem>Track Order</DropdownMenuItem>
                  <DropdownMenuItem>Past Orders</DropdownMenuItem>
                  <DropdownMenuItem>
                    Sage Points
                    <Progress value={33} className="ml-2 w-16" />
                  </DropdownMenuItem>
                  <DropdownMenuItem>Schedule</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>Log in</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log in</DialogTitle>
                        <DialogDescription>Enter your credentials to log in to your account.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <Input type="email" placeholder="Email" required />
                        <Input type="password" placeholder="Password" required />
                        <Button type="submit" className="w-full">Log in</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>Sign up</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sign up</DialogTitle>
                        <DialogDescription>Create a new account to join our community.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <Input type="text" placeholder="Full Name" required />
                        <Input type="email" placeholder="Email" required />
                        <Input type="password" placeholder="Password" required />
                        <Input type="password" placeholder="Confirm Password" required />
                        <Button type="submit" className="w-full">Sign up</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5 text-[#113108]" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Wishlist</SheetTitle>
                <SheetDescription>Items you've saved for later</SheetDescription>
              </SheetHeader>
              <div>
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <span>{item.name}</span>
                    <Button onClick={() => removeFromWishlist(item.id)}>Remove</Button>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5 text-[#113108]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item(s) in your cart`}
                </SheetDescription>
              </SheetHeader>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={50} 
                        height={50} 
                        className="rounded-md object-cover"
                      />
                    )}
                    <div>
                      <span>{item.name}</span>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <Button onClick={() => removeFromCart(item.id)} variant="destructive" size="sm" className="mt-2">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 font-bold">
                Total: ${cartTotal.toFixed(2)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}