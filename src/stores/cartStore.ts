import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, Product } from '../types/Product';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem('cart') ?? '[]')
  );

  const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value));
  };

  const addToCart = (product: Product) => {
    const existing = items.value.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ product, quantity: 1 });
    }
    saveToStorage();
  };

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((i) => i.product.id !== productId);
    saveToStorage();
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) removeFromCart(productId);
      else saveToStorage();
    }
  };

  const clearCart = () => {
    items.value = [];
    saveToStorage();
  };

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  const isInCart = (productId: number) =>
    items.value.some((i) => i.product.id === productId);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isInCart };
});