import React from 'react'
import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/components/CollectionsPage'

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  addToWishlist: (product: Product) => void;
  openProductDetails: (product: Product) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  wishlist: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  addToCart,
  addToWishlist,
  openProductDetails,
  updateQuantity,
  wishlist = [] // Provide a default empty array
}) => {
  const handleWishlistToggle = (product: Product) => {
    console.log('Wishlist button clicked for product:', product);
    addToWishlist(product);
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        return (
          <div key={product.id} className="group relative transition-all duration-300 hover:shadow-lg">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-stone-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 flex flex-col space-y-2">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-sm font-medium text-[#113108]">${product.price}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <Button 
                className="w-full bg-[#113108] text-white hover:bg-[#1c4912]"
                onClick={() => openProductDetails(product)}
              >
                View Details
              </Button>
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-[#113108] text-white hover:bg-[#1c4912]"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button 
                  className={`flex-none border ${isInWishlist ? 'bg-[#113108] text-white' : 'bg-transparent text-[#113108]'} border-[#113108] hover:bg-[#113108] hover:text-white`}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default ProductGrid;