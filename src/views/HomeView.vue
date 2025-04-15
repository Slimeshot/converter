<template>
  <div class="home">
    <h1 class="home__title">Текущие курсы валют</h1>
    <template v-if="isLoaded">
      <div
        v-for="currency in listBaseRate"
        :key="currency.code"
        class="home__currency"
      >
        <span>за 1 {{ currency.code }} = </span>
        <AnimatedNumber :to="1 / currency.value" />
        <span>&nbsp;{{ currencyStore.baseCurrency.name }}</span>
      </div>
    </template>
    <UiLoader v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AnimatedNumber from '@/components/AnimatedNumber.vue'
import UiLoader from '@/components/ui/loaders/ui-loader/index.vue'
import { useCurrencyStore } from '@/stores/currency'
import type { ICurrencyData } from '@/types/currency'

const currencyStore = useCurrencyStore()
const isLoaded = ref(false)

const listBaseRate = computed((): ICurrencyData[] => {
  if (currencyStore.baseRate) {
    return Object.values(currencyStore.baseRate)
  }
  return []
})

onMounted(async () => {
  await currencyStore.setBaseCurrency(currencyStore.baseCurrency)
  isLoaded.value = true
})
</script>

<style lang="scss" scoped>
.home {
  &__title {
    font-size: 42px;
    margin-bottom: 32px;

    @media (max-width: 540px) {
      font-size: 32px;
    }
  }

  &__currency {
    font-size: 24px;

    @media (max-width: 540px) {
      font-size: 18px;
    }
  }
}
</style>
