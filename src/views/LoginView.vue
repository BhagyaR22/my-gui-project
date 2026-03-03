<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value);
    router.push('/');
  } catch {
    // error is surfaced via auth.error
  }
};
</script>

<template>
  <main class="min-h-[80vh] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
            </svg>
          </div>
          <h1 class="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your account</p>
        </div>

        <!-- Hint -->
        <div class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-3 mb-6 text-xs text-indigo-700 dark:text-indigo-300">
          <span class="font-bold">Demo credentials:</span> username <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">emilys</code>, password <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">emilyspass</code>
        </div>

        <!-- Error -->
        <div
          v-if="auth.error"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl p-3 mb-5"
        >
          {{ auth.error }}
        </div>

        <!-- Form -->
        <div class="space-y-4">
          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              @keyup.enter="handleLogin"
              class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                @keyup.enter="handleLogin"
                class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            @click="handleLogin"
            :disabled="auth.isLoading || !username || !password"
            class="w-full py-3.5 mt-2 rounded-xl font-bold text-base transition-all duration-200"
            :class="
              auth.isLoading || !username || !password
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
            "
          >
            <span v-if="auth.isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Signing In...
            </span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
