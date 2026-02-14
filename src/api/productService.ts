import type { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  // Broadening categories to include Laptops (Gaming), Watches, and Tech Accessories
  const categories = [
    'laptops', 
    'smartphones', 
    'tablets', 
    'mens-watches', 
    'mobile-accessories'
  ];
  
  const requests = categories.map(cat => 
    fetch(`https://dummyjson.com/products/category/${cat}`).then(res => res.json())
  );

  const results = await Promise.all(requests);
  
  // Combines all items into one large list for Bhagya Digital Hub
  return results.flatMap(result => result.products);
};