<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import type { Product } from '../types/Product';

const props = defineProps<{ product: Product }>();
const router = useRouter();
const cart = useCartStore();

const discountedPrice = (product: Product): number =>
  +(product.price * (1 - product.discountPercentage / 100)).toFixed(2);

const goToProduct = () => {
  router.push(`/product/${props.product.id}`);
};

const addToCart = (event: MouseEvent) => {
  event.stopPropagation();
  cart.addToCart(props.product);
};
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    @click="goToProduct"
  >
    <div class="bg-slate-50 dark:bg-slate-900 p-6 flex justify-center items-center h-52">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-contain" />
    </div>

    <div class="p-5 flex flex-col flex-1">
      <span class="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
        {{ product.category }}
      </span>

      <h3 class="mt-1 text-base font-bold text-slate-800 dark:text-white leading-tight line-clamp-2 flex-1">
        {{ product.title }}
      </h3>

      <div class="flex items-center gap-1 mt-2">
        <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
        </svg>
        <span class="text-xs text-slate-400 dark:text-slate-500 ml-1">({{ product.rating }})</span>
      </div>

      <div class="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
        <div>
          <p class="text-xl font-black text-slate-900 dark:text-white">${{ discountedPrice(product) }}</p>
          <p v-if="product.discountPercentage > 0" class="text-xs text-slate-400 line-through">${{ product.price }}</p>
        </div>
        <button
          @click="addToCart"
          class="px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
          :class="cart.isInCart(product.id)
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'"
        >
          {{ cart.isInCart(product.id) ? '✓ Added' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>