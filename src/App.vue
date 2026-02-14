<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from './types/Product';
import { fetchProducts } from './api/productService';
import ProductCard from './components/ProductCard.vue';
import SearchBar from './components/SearchBar.vue';

const products = ref<Product[]>([]);
const searchQuery = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error("Initialization Error:", error);
  } finally {
    loading.value = false;
  }
});

// Simple search logic - looking at Title only as requested
const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-black text-indigo-950 tracking-tight">Great Digital Hub</h1>
      <p class="text-lg text-slate-500 mt-3 font-medium text-center">Gaming Gear, Digital Timepieces, and High-End Tech</p>
    </header>

    <SearchBar v-model="searchQuery" />

    <main>
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600 mb-4"></div>
        <p class="text-indigo-900 font-bold">Updating Inventory...</p>
      </div>

      <div v-else-if="filteredProducts.length > 0" 
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <div v-else class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
        <p class="text-xl text-slate-500">No items found matching "{{ searchQuery }}"</p>
      </div>
    </main>

    <footer class="mt-24 pt-10 border-t border-slate-200 text-center">
      <p class="text-slate-400 text-sm font-medium uppercase tracking-widest">
        &copy; 2026 Bhagya Digital Hub | Engineering Project Submission
      </p>
    </footer>
  </div>
</template>