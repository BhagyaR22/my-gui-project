<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from '../types/Product';
import { fetchProducts } from '../api/productService';
import ProductCard from '../components/ProductCard.vue';
import SearchBar from '../components/SearchBar.vue';

const products = ref<Product[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('all');
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
  return products.value.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === 'all' ||
      product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const formatCategory = (cat: string): string =>
  cat === 'all' ? 'All Products' : cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Hero -->
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white tracking-tight">
        Great Digital Hub
      </h1>
      <p class="text-lg text-slate-500 dark:text-slate-400 mt-3 font-medium">
        Gaming Gear, Digital Timepieces, and High-End Tech
      </p>
    </header>

    <!-- Search -->
    <SearchBar v-model="searchQuery" />

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2 mb-8 justify-center">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border"
        :class="
          selectedCategory === cat
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
        "
      >
        {{ formatCategory(cat) }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24">
      <div class="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600 mb-4"></div>
      <p class="text-indigo-900 dark:text-indigo-300 font-bold">Loading inventory...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-500 text-xl font-semibold">{{ error }}</p>
    </div>

    <!-- Grid -->
    <div
      v-else-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700"
    >
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
