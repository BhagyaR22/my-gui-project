<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from '../types/Product';
import { fetchProducts } from '../api/productService';
import ProductCard from '../components/ProductCard.vue';
import SearchBar from '../components/SearchBar.vue';

const products = ref<Product[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('all');
const sortOrder = ref<'none' | 'asc' | 'desc'>('none');
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (e) {
    error.value = 'Failed to load products. Please try again.';
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const categories = computed<string[]>(() => {
  const cats = new Set(products.value.map((p) => p.category));
  return ['all', ...Array.from(cats).sort()];
});

const filteredProducts = computed<Product[]>(() => {
  let result = products.value.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });

  if (sortOrder.value === 'asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
});

const formatCategory = (cat: string): string =>
  cat === 'all' ? 'All Products' : cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white tracking-tight">
        Great Digital Hub
      </h1>
      <p class="text-lg text-slate-500 dark:text-slate-400 mt-3 font-medium">
        Gaming Gear, Digital Timepieces, and High-End Tech
      </p>
    </header>

    <SearchBar v-model="searchQuery" />

    <!-- Filters Row -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">

      <!-- Category Pills -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border"
          :class="selectedCategory === cat
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'"
        >
          {{ formatCategory(cat) }}
        </button>
      </div>

      <!-- Sort Dropdown -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M6 12h12M9 17h6" />
        </svg>
        <span class="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Sort by:</span>
        <select
          v-model="sortOrder"
          class="pl-3 pr-8 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white text-sm font-semibold focus:border-indigo-500 outline-none transition-colors cursor-pointer appearance-none"
        >
          <option value="none">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Results count -->
    <div v-if="!loading && !error" class="mb-4 text-sm text-slate-400 dark:text-slate-500 font-medium">
      Showing {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }}
      <span v-if="selectedCategory !== 'all'"> in <span class="text-indigo-500 font-semibold">{{ formatCategory(selectedCategory) }}</span></span>
      <span v-if="searchQuery"> matching "<span class="text-indigo-500 font-semibold">{{ searchQuery }}</span>"</span>
      <span v-if="sortOrder !== 'none'"> — sorted by <span class="text-indigo-500 font-semibold">{{ sortOrder === 'asc' ? 'lowest price' : 'highest price' }}</span></span>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-24">
      <div class="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600 mb-4"></div>
      <p class="text-indigo-900 dark:text-indigo-300 font-bold">Loading inventory...</p>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-500 text-xl font-semibold">{{ error }}</p>
    </div>

    <div
      v-else-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click.stop
      />
    </div>

    <div v-else class="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
      <p class="text-xl text-slate-500 dark:text-slate-400">
        No items found matching "<span class="font-bold text-indigo-600">{{ searchQuery }}</span>"
      </p>
      <button
        @click="searchQuery = ''; selectedCategory = 'all'"
        class="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  </main>
</template>