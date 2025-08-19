<!-- src/pages/HomePage.vue -->
<template>
    <div>
      <t-button theme="primary" @click="increment">{{ count }}</t-button>
      <p>欢迎使用 TDesign + Vue3 SSR 项目！当前计数：{{ count }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const count = ref(0);
  const increment = () => { count.value++; };
  </script>
  