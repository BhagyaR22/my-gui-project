<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="max-w-xl mx-auto mb-8">
    <input
      type="text"
      placeholder="Search for software, digital art, or templates..."
      @input="handleInput"
      class="w-full px-5 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 outline-none shadow-sm"
    />
  </div>
</template>