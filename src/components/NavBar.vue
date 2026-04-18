<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const cart = useCartStore();
const auth = useAuthStore();

const isDark = ref(document.documentElement.classList.contains('dark'));

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
};
</script>

<template>
  <nav class="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-2xl font-black text-indigo-600 dark:text-indigo-400">Great</span>
        <span class="text-2xl font-black text-slate-800 dark:text-white">Digital Hub</span>
      </RouterLink>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <!-- Dark mode toggle -->
        <button
          @click="toggleDark"
          class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          :title="isDark ? 'Light mode' : 'Dark mode'"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm9-9h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 0 0-2h1a1 1 0 0 1 1 1Zm1.636-5.95-.707-.708a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414Zm14.142 11.314-.707-.707a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414ZM18.364 6.05l.707-.707a1 1 0 0 0-1.414-1.414l-.707.707A1 1 0 0 0 18.364 6.05ZM5.636 18.364l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75 9.75 9.75 0 0 1 12 2.25a9.718 9.718 0 0 1 6.998 3.003.75.75 0 0 1-.547 1.267A8.25 8.25 0 1 0 20.517 14.5a.75.75 0 0 1 1.235.502Z"/>
          </svg>
        </button>

        <!-- Cart -->
        <RouterLink to="/cart" class="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >{{ cart.totalItems }}</span>
        </RouterLink>

        <!-- Auth -->
        <button
          v-if="auth.isLoggedIn"
          @click="auth.logout(); router.push('/')"
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
</template>
