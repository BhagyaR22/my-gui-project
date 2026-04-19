<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const cart = useCartStore();
const auth = useAuthStore();

const isDark = ref(document.documentElement.classList.contains('dark'));
const activeModal = ref<'about' | 'services' | 'contact' | null>(null);

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
};

const openModal = (modal: 'about' | 'services' | 'contact') => {
  activeModal.value = modal;
};

const closeModal = () => {
  activeModal.value = null;
};
</script>

<template>
  <nav class="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 flex-shrink-0">
        <span class="text-2xl font-black text-indigo-600 dark:text-indigo-400">Great</span>
        <span class="text-2xl font-black text-slate-800 dark:text-white">Digital Hub</span>
      </RouterLink>

      <!-- Center Nav Links -->
      <div class="hidden md:flex items-center gap-6">
        <button @click="openModal('about')" class="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</button>
        <button @click="openModal('services')" class="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Services</button>
        <button @click="openModal('contact')" class="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</button>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-3">

        <!-- Dark mode toggle -->
        <button
          @click.stop="toggleDark"
          class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm9-9h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 0 0-2h1a1 1 0 0 1 1 1Zm1.636-5.95-.707-.708a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414Zm14.142 11.314-.707-.707a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414ZM18.364 6.05l.707-.707a1 1 0 0 0-1.414-1.414l-.707.707A1 1 0 0 0 18.364 6.05ZM5.636 18.364l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 12 2.25a9.718 9.718 0 0 1 6.998 3.003.75.75 0 0 1-.547 1.267A8.25 8.25 0 1 0 20.517 14.5a.75.75 0 0 1 1.235.502Z"/>
          </svg>
        </button>

        <!-- Cart -->
        <button
          @click.stop="router.push('/cart')"
          class="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center pointer-events-none"
          >{{ cart.totalItems }}</span>
        </button>

        <!-- Auth -->
        <button
          v-if="auth.isLoggedIn"
          @click.stop="auth.logout(); router.push('/')"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <img :src="auth.user!.image" class="h-6 w-6 rounded-full" />
          Logout
        </button>
        <RouterLink
          v-else
          to="/login"
          class="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Login
        </RouterLink>

      </div>
    </div>
  </nav>

  <!-- Modal Backdrop -->
  <div
    v-if="activeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    @click.self="closeModal"
  >

    <!-- About Modal -->
    <div v-if="activeModal === 'about'" class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">About Us</h2>
        <button @click="closeModal" class="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-3xl font-black text-indigo-600 dark:text-indigo-400">Great</span>
          <span class="text-3xl font-black text-slate-800 dark:text-white">Digital Hub</span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
          Great Digital Hub is your go-to destination for premium tech products. We specialize in laptops, smartphones, tablets, watches, and mobile accessories — all sourced from top global brands.
        </p>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
          Founded with a passion for technology, we are committed to bringing you the latest and greatest devices at competitive prices with outstanding customer service.
        </p>
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div class="text-center">
            <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400">500+</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Products</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400">10K+</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Customers</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400">5★</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Rated</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Modal -->
    <div v-if="activeModal === 'services'" class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">Our Services</h2>
        <button @click="closeModal" class="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">Online Shopping</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Browse and purchase from our wide range of premium tech products with ease.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">Warranty & Support</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">All products come with a 1-year company warranty and dedicated after-sales support.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">Fast Delivery</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Quick and reliable delivery to your doorstep across the island.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">Best Price Guarantee</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">We offer the most competitive prices with exclusive discounts on top brands.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <div v-if="activeModal === 'contact'" class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">Contact Us</h2>
        <button @click="closeModal" class="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white text-sm">Address</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">123 Tech Street, Colombo 03, Sri Lanka</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white text-sm">Phone</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">+94 11 234 5678</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white text-sm">Email</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">support@greatdigitalhub.com</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl">
          <div class="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white text-sm">Working Hours</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">Mon – Sat: 9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>