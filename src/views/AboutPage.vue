<!-- src/pages/AboutPage.vue -->
<template>
  <div>
    <h2>关于我们</h2>
    <p>介绍: {{ info.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

interface InfoData {
  description: string
}
const info = ref<InfoData>({ description: "加载中..." })

// 在组件挂载时请求后端数据
onMounted(async () => {})
</script>
