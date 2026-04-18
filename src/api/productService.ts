import type { Product, ProductsResponse, LoginResponse } from '../types/Product';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (): Promise<Product[]> => {
  const categories: string[] = [
    'laptops',
    'smartphones',
    'tablets',
    'mens-watches',
    'mobile-accessories',
  ];

  const requests = categories.map((cat) =>
    fetch(`${BASE_URL}/products/category/${cat}`)
      .then((res) => res.json() as Promise<ProductsResponse>)
  );

  const results = await Promise.all(requests);
  return results.flatMap((result) => result.products);
};

export const fetchProductById = async (id: number): Promise<Product> => {
  console.log('fetching product id:', id);
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json() as Promise<Product>;
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return (data as { slug: string; name: string }[]).map((c) => c.slug);
};

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json() as Promise<LoginResponse>;
};