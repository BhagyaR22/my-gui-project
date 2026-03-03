<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const router = useRouter();
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-black text-slate-900 dark:text-white mb-8">Your Cart</h1>

    <!-- Empty state -->
    <div
      v-if="cart.items.length === 0"
      class="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      </svg>
      <p class="text-xl text-slate-500 dark:text-slate-400 font-semibold">Your cart is empty</p>
      <button
        @click="router.push('/')"
        class="mt-5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
      >
        Browse Products
      </button>
    </div>

    <!-- Cart items -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in cart.items"
        :key="item.product.id"
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 flex items-center gap-4"
      >
        <!-- Image -->
        <div class="h-20 w-20 flex-shrink-0 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
          <img :src="item.product.thumbnail" :alt="item.product.title" class="h-full w-full object-contain p-1" />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold uppercase text-indigo-500 tracking-wider">{{ item.product.category }}</p>
          <h3
            class="font-bold text-slate-800 dark:text-white truncate cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
            @click="router.push({ name: 'product', params: { id: item.product.id } })"
          >
            {{ item.product.title }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">${{ item.product.price }} each</p>
        </div>

        <!-- Quantity -->
        <div class="flex items-center gap-2">
          <button
            @click="cart.updateQuantity(item.product.id, item.quantity - 1)"
            class="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-700 font-bold text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
          >-</button>
          <span class="w-6 text-center font-bold text-slate-800 dark:text-white">{{ item.quantity }}</span>
          <button
            @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
            class="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-700 font-bold text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
          >+</button>
        </div>

        <!-- Subtotal -->
        <p class="w-20 text-right font-black text-slate-900 dark:text-white">
          ${{ (item.product.price * item.quantity).toFixed(2) }}
        </p>

        <!-- Remove -->
        <button
          @click="cart.removeFromCart(item.product.id)"
          class="ml-2 p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Summary -->
      <div class="mt-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div class="flex justify-between items-center mb-2 text-slate-600 dark:text-slate-400 text-sm">
          <span>Items ({{ cart.totalItems }})</span>
          <span>${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center mb-6 font-black text-xl text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-700 pt-4 mt-4">
          <span>Total</span>
          <span>${{ cart.totalPrice.toFixed(2) }}</span>
        </div>

        <div class="flex gap-3 flex-col sm:flex-row">
          <button
            @click="cart.clearCart()"
            class="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 hover:border-red-300 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors"
          >
            Clear Cart
          </button>
          <button
            class="flex-1 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
