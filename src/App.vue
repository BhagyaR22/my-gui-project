<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
    <NavBar />
    <RouterView />
    <footer class="mt-24 pb-10 text-center">
      <p class="text-slate-400 dark:text-slate-600 text-sm font-medium uppercase tracking-widest">
        &copy; 2026 Great Digital Hub | Engineering Project Submission
      </p>
    </footer>
  </div>
</template>