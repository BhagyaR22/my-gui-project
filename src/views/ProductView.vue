<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { fetchProductById } from '../api/productService';
import type { Product } from '../types/Product';

const props = defineProps<{ id: string }>();
const router = useRouter();
const cart = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedImage = ref('');

onMounted(async () => {
  try {
    const data = await fetchProductById(Number(props.id));
    product.value = data;
    selectedImage.value = data.thumbnail;
  } catch (e) {
    error.value = 'Product not found.';
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const discountedPrice = (p: Product): string =>
  (p.price * (1 - p.discountPercentage / 100)).toFixed(2);
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <button
      @click="router.push('/')"
      class="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Products
    </button>

    <div v-if="loading" class="flex flex-col items-center justify-center py-32">
      <div class="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600 mb-4"></div>
      <p class="text-indigo-900 dark:text-indigo-300 font-bold">Loading product...</p>
    </div>

    <div v-else-if="error" class="text-center py-32">
      <p class="text-red-500 text-xl font-semibold">{{ error }}</p>
      <button @click="router.push('/')" class="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold">
        Go Home
      </button>
    </div>

    <div v-else-if="product" class="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div class="bg-slate-50 dark:bg-slate-900 p-8 flex flex-col gap-4">
          <div class="flex items-center justify-center h-72 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
            <img :src="selectedImage" :alt="product.title" class="h-full w-full object-contain transition-all duration-300" />
          </div>
          <div class="flex gap-2 flex-wrap justify-center">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="selectedImage = img"
              class="h-16 w-16 rounded-xl border-2 overflow-hidden transition-all duration-200"
              :class="selectedImage === img ? 'border-indigo-500' : 'border-transparent hover:border-slate-300'"
            >
              <img :src="img" :alt="`View ${i + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <div class="p-8 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">{{ product.category }}</span>
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1 leading-tight">{{ product.title }}</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">by {{ product.brand }}</p>
            <div class="flex items-center gap-1.5 mt-3">
              <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
              </svg>
              <span class="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-1">{{ product.rating }} / 5</span>
            </div>
            <p class="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed text-sm">{{ product.description }}</p>
            <div class="mt-4 flex items-center gap-2">
              <span
                class="inline-block h-2.5 w-2.5 rounded-full"
                :class="product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-400' : 'bg-red-500'"
              ></span>
              <span class="text-sm font-medium text-slate-600 dark:text-slate-300">
                {{ product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock' }}
              </span>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <div class="flex items-end gap-3 mb-5">
              <p class="text-4xl font-black text-slate-900 dark:text-white">${{ discountedPrice(product) }}</p>
              <div v-if="product.discountPercentage > 0" class="flex flex-col">
                <span class="text-sm text-slate-400 line-through">${{ product.price }}</span>
                <span class="text-xs font-bold text-green-600 dark:text-green-400">{{ product.discountPercentage.toFixed(0) }}% OFF</span>
              </div>
            </div>
            <button
              @click="cart.addToCart(product!)"
              :disabled="product.stock === 0"
              class="w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg"
              :class="product.stock === 0
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : cart.isInCart(product.id)
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'"
            >
              {{ product.stock === 0 ? 'Out of Stock' : cart.isInCart(product.id) ? '✓ Added to Cart' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>