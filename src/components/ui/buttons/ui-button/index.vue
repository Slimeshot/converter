<template>
  <component :is="component" class="ui-button">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: false,
  },
})

const component = computed(() => {
  return props.to ? 'router-link' : 'button'
})
</script>

<style lang="scss" scoped></style>
