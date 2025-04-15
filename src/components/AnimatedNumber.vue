<template>
  <span>{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'

const props = defineProps({
  to: {
    type: Number,
    required: true,
  },
})

const displayValue = ref<string>(props.to.toFixed(2))
let animationFrame: number

watch(
  () => props.to,
  (newVal) => {
    const start = parseFloat(displayValue.value) || 0
    const end = newVal
    const startTime = performance.now()
    const duration = 500

    cancelAnimationFrame(animationFrame)

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = start + (end - start) * progress
      displayValue.value = value.toFixed(2)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  },
  { immediate: true }
)
</script>
