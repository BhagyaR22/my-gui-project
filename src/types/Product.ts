export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  brand: string; // Added brand property
  rating: number;
}