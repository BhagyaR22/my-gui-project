<script setup lang="ts">
defineProps<{ product: any }>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
    <div class="bg-slate-50 p-6 flex justify-center items-center">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-44 object-contain" />
    </div>
    
    <div class="p-6">
      <h3 class="text-lg font-bold text-slate-800 leading-tight h-12 line-clamp-2">
        {{ product.title }}
      </h3>
      
      <div class="mt-6 flex items-center justify-between border-t border-slate-50 pt-5">
        <p class="text-2xl font-black text-slate-900">${{ product.price }}</p>
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          Get Now
        </button>
      </div>
    </div>
  </div>
</template>a<script setup lang="ts">
defineProps<{ product: any }>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
    <div class="bg-slate-50 p-6 flex justify-center items-center">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-44 object-contain" />
    </div>
    
    <div class="p-6">
      <h3 class="text-lg font-bold text-slate-800 leading-tight h-12 line-clamp-2">
        {{ product.title }}
      </h3>
      
      <div class="mt-6 flex items-center justify-between border-t border-slate-50 pt-5">
        <p class="text-2xl font-black text-slate-900">${{ product.price }}</p>
        <button class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          Get Now
        </button>
      </div>
    </div>
  </div>
</template>