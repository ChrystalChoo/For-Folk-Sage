import React, { useState, useEffect } from 'react'
import { Star, Heart, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Product } from '@/components/CollectionsPage'

interface ProductDetailsProps {
  selectedProduct: Product | null;
  closeProductDetails: () => void;
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  selectedProduct,
  closeProductDetails,
  addToCart,
  addToWishlist,
  updateQuantity
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(selectedProduct.quantity);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleQuantityChange = (newQuantity: number) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);
    updateQuantity(selectedProduct.id, updatedQuantity);
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
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-[#113108] text-white hover:bg-[#1c4912]"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  className="flex-none border-[#113108] text-[#113108] hover:bg-[#113108] hover:text-white"
                  onClick={() => addToWishlist(selectedProduct)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  className="px-2 py-1"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{quantity}</span>
                <Button
                  variant="outline"
                  className="px-2 py-1"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
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