<template>
  <the-header class="the-header" />
  <main class="app-content">
    <div class="container">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import TheHeader from '@/components/ui/headers/TheHeader.vue'
</script>

<style lang="scss" scoped>
.the-header {
  margin-bottom: 16px;
}
</style>
