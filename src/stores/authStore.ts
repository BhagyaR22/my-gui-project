import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types/Product';
import { loginUser } from '../api/productService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') ?? 'null')
  );
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  const login = async (username: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await loginUser(username, password);
      user.value = data;
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, isLoading, error, isLoggedIn, login, logout };
});