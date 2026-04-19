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
  <div class="min-h-screen">

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32">
      <div class="animate-spin rounded-full h-14 w-14 border-b-4 border-orange-500 mb-4"></div>
      <p class="text-orange-500 font-bold">Loading product...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-32">
      <p class="text-red-500 text-xl font-semibold">{{ error }}</p>
      <button @click="router.push('/')" class="mt-4 px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold">
        Go Home
      </button>
    </div>

    <div v-else-if="product">

      <!-- Hero Banner -->
      <div class="bg-slate-100 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">

          <!-- Back -->
          <button
            @click="router.push('/')"
            class="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-orange-500 mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>

          <!-- Badges -->
          <div class="flex items-center gap-3 mb-3">
            <span v-if="product.discountPercentage > 10" class="flex items-center gap-1 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded">
              % SPECIAL OFFER
            </span>
            <span class="flex items-center gap-1 bg-slate-300 dark:bg-gray-700 text-slate-700 dark:text-white text-xs font-black px-3 py-1 rounded">
              ★ NEW ARRIVAL
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            {{ product.title }}
          </h1>
          <p class="text-slate-500 dark:text-gray-400 text-lg mt-1 font-medium capitalize">
            {{ product.category.replace(/-/g, ' ') }}
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <!-- Left: Image + Price + Cart -->
          <div>
            <!-- Main Image -->
            <div class="bg-slate-100 dark:bg-gray-900 rounded-2xl p-8 flex items-center justify-center h-80 border border-slate-200 dark:border-gray-800">
              <img :src="selectedImage" :alt="product.title" class="h-full w-full object-contain" />
            </div>

            <!-- Thumbnails -->
            <div class="flex gap-3 mt-4 flex-wrap">
              <button
                v-for="(img, i) in product.images"
                :key="i"
                @click="selectedImage = img"
                class="h-16 w-16 rounded-xl border-2 overflow-hidden transition-all"
                :class="selectedImage === img ? 'border-orange-500' : 'border-slate-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-500'"
              >
                <img :src="img" :alt="`View ${i + 1}`" class="h-full w-full object-cover" />
              </button>
            </div>

            <!-- Divider -->
            <div class="border-t border-slate-200 dark:border-gray-800 mt-6 pt-6">

              <!-- Price -->
              <div class="text-center mb-4">
                <p class="text-4xl font-black text-slate-900 dark:text-white">${{ discountedPrice(product) }}</p>
                <p v-if="product.discountPercentage > 0" class="text-slate-400 dark:text-gray-500 line-through text-lg mt-1">
                  ${{ product.price }} — Retail Price
                </p>
              </div>

              <!-- Stock -->
              <div class="flex items-center justify-center gap-2 mb-6">
                <span
                  class="inline-block h-2.5 w-2.5 rounded-full"
                  :class="product.stock > 10 ? 'bg-orange-500' : product.stock > 0 ? 'bg-yellow-400' : 'bg-red-500'"
                ></span>
                <span class="font-bold text-sm"
                  :class="product.stock > 10 ? 'text-orange-500' : product.stock > 0 ? 'text-yellow-500' : 'text-red-500'">
                  {{ product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock' }}
                </span>
              </div>

              <!-- Add to Cart -->
              <button
                @click="cart.addToCart(product!)"
                :disabled="product.stock === 0"
                class="w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all duration-200"
                :class="product.stock === 0
                  ? 'bg-slate-200 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'
                  : cart.isInCart(product.id)
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'"
              >
                {{ product.stock === 0 ? 'Out of Stock' : cart.isInCart(product.id) ? '✓ Added to Cart' : 'Add to Cart' }}
              </button>
            </div>
          </div>

          <!-- Right: Specs Table -->
          <div>

            <!-- Description -->
            <div class="bg-slate-100 dark:bg-gray-900 rounded-2xl p-6 border border-slate-200 dark:border-gray-800 mb-6">
              <p class="text-slate-600 dark:text-gray-300 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- General Info -->
            <div class="bg-slate-100 dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden mb-6">
              <div class="px-6 py-4 border-b border-slate-200 dark:border-gray-800">
                <h2 class="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">General</h2>
              </div>
              <table class="w-full">
                <tbody>
                  <tr class="border-b border-slate-200 dark:border-gray-800">
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm w-1/3">Brand</td>
                    <td class="px-6 py-3 text-slate-800 dark:text-white text-sm">{{ product.brand }}</td>
                  </tr>
                  <tr class="border-b border-slate-200 dark:border-gray-800">
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm">Category</td>
                    <td class="px-6 py-3 text-slate-800 dark:text-white text-sm capitalize">{{ product.category.replace(/-/g, ' ') }}</td>
                  </tr>
                  <tr class="border-b border-slate-200 dark:border-gray-800">
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm">Rating</td>
                    <td class="px-6 py-3 text-sm">
                      <div class="flex items-center gap-2">
                        <div class="flex">
                          <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= Math.round(product.rating) ? 'text-orange-400' : 'text-slate-300 dark:text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
                          </svg>
                        </div>
                        <span class="text-slate-800 dark:text-white font-semibold">{{ product.rating }} / 5</span>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-b border-slate-200 dark:border-gray-800">
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm">Discount</td>
                    <td class="px-6 py-3 text-orange-500 font-bold text-sm">{{ product.discountPercentage.toFixed(0) }}% OFF</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm">Warranty</td>
                    <td class="px-6 py-3 text-slate-800 dark:text-white text-sm">1 Year Company Warranty</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pricing Info -->
            <div class="bg-slate-100 dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden">
              <div class="px-6 py-4 border-b border-slate-200 dark:border-gray-800">
                <h2 class="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Pricing</h2>
              </div>
              <table class="w-full">
                <tbody>
                  <tr class="border-b border-slate-200 dark:border-gray-800">
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm w-1/3">Retail Price</td>
                    <td class="px-6 py-3 text-slate-400 dark:text-gray-500 line-through text-sm">${{ product.price }}</td>
                  </tr>
                  <tr class="border-b border-slate-200 dark:border-gray-800">
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm">Discount</td>
                    <td class="px-6 py-3 text-orange-500 font-bold text-sm">{{ product.discountPercentage.toFixed(0) }}% OFF</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3 text-slate-500 dark:text-gray-400 font-semibold text-sm">Our Price</td>
                    <td class="px-6 py-3 text-slate-900 dark:text-white font-black text-lg">${{ discountedPrice(product) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>