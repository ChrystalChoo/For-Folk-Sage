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