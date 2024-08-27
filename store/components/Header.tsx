import React from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Heart, ChevronDown, X, Plus, Minus } from 'lucide-react'
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
import { useCart } from '../context/CartContext'
import { Product } from '../types'


interface HeaderProps {
  isLoggedIn: boolean;
  handleLogin: (e: React.FormEvent) => void;
  handleLogout: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
  wishlist: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
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
  searchQuery,
  setSearchQuery,
  handleSearch,
  removeFromWishlist,
}: HeaderProps) {
  const { cart, removeFromCart, updateCartItemQuantity, cartTotal } = useCart();

  const categories = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/collections' },
    { name: 'Community', href: '/community' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Folks', href: '/folks' }
  ]

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
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Log in</DropdownMenuItem>
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
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Sign up</DropdownMenuItem>
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
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Your Wishlist</SheetTitle>
                <SheetDescription>
                  {wishlist.length === 0 ? "Your wishlist is empty" : `You have ${wishlist.length} item(s) in your wishlist`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span>${item.price}</span>
                      <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5 text-[#113108]" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? "Your cart is empty" : `You have ${cart.length} item(s) in your cart`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button className="mt-4 w-full">Proceed to Checkout</Button>
                </div>
              )}
              <SheetClose asChild>
                <Button className="mt-4" variant="outline">Continue Shopping</Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}