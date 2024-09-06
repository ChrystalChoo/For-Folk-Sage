import React, { useState, useEffect } from 'react'
import { Star, Heart, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Product } from '@/components/CollectionsPage'

interface ProductDetailsProps {
  selectedProduct: Product | null;
  closeProductDetails: () => void;
  addToCart: (product: Product, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  wishlist: Product[]; // Add this line
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  selectedProduct,
  closeProductDetails,
  addToCart,
  addToWishlist,
  wishlist // Add this line
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isInWishlist = wishlist.some(item => item.id === selectedProduct.id);

  const handleQuantityChange = (newQuantity: number) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      closeProductDetails();
    }
  };

  return (
    <Dialog open={selectedProduct !== null} onOpenChange={closeProductDetails}>
      <DialogContent className="max-w-3xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
            <p className="mt-2 text-xl font-medium text-[#113108]">${selectedProduct.price}</p>
            <div className="mt-4 flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
            </div>
            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="mt-6">
              <h3 className="text-lg font-medium">Size Guide</h3>
              <ul className="mt-2 space-y-1">
                {selectedProduct.sizes.map((size: string) => (
                  <li key={size}>{size}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProduct.sizes.map((size: string) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between">
                <Button
                  className="px-2 py-1"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{quantity}</span>
                <Button
                  className="px-2 py-1"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-[#113108] text-white hover:bg-[#1c4912]"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  className={`flex-none border ${isInWishlist ? 'bg-[#113108] text-white' : 'bg-transparent text-[#113108]'} border-[#113108] hover:bg-[#113108] hover:text-white`}
                  onClick={() => {
                    if (selectedProduct) {
                      console.log('Wishlist button clicked for product:', selectedProduct);
                      addToWishlist(selectedProduct);
                    }
                  }}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails;