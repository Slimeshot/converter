<template>
  <header class="header">
    <div class="header__container container">
      <RouterLink :to="LIST_ROUTES_APP.PAGE_HOME" class="header__logo"> Converter </RouterLink>

      <nav class="header__navigate">
        <RouterLink :to="LIST_ROUTES_APP.PAGE_HOME" class="header__link"> Home </RouterLink>
        <RouterLink :to="LIST_ROUTES_APP.PAGE_CONVERT" class="header__link"> Convert </RouterLink>
      </nav>
      <ui-select
        :options="LIST_DEFAULT_CURRENCY"
        placeholder="Валюта"
        hide-placeholder
        v-model="baseCurrency"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UiSelect from '@/components/ui/selects/ui-select/index.vue'

import { ref, watch } from 'vue'
import { LIST_ROUTES_APP } from '@/constants/routes'
import { LIST_DEFAULT_CURRENCY } from '@/constants/currency'
import { useCurrencyStore } from '@/stores/currency'
import type { ISelectOption } from '../selects/ui-select/types'

const currencyStore = useCurrencyStore()

const baseCurrency = ref<ISelectOption>(currencyStore.baseCurrency)

watch(baseCurrency, (newValue) => {
  currencyStore.setBaseCurrency(newValue)
})
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  background-color: rgb(66, 68, 117);
  display: flex;
  padding: 0;

  &__container {
    display: grid;
    align-items: center;
    height: 100%;
    grid-template-columns: 200px 1fr 100px;

    @media (max-width: 540px) {
      grid-template-columns: 130px 1fr 80px;
    }
  }

  &__logo {
    display: inline-block;
    font-size: 36px;
    vertical-align: middle;
    line-height: 64px;

    @media (max-width: 540px) {
      font-size: 24px;
    }
  }

  &__link {
    transition: border-color 0.1s ease;
    border-bottom: 1px solid transparent;

    @media (max-width: 540px) {
      font-size: 14px;
    }

    &:not(:last-child) {
      margin-right: 16px;
    }
    &:hover {
      border-color: #fff;
    }
  }

  &__link.router-link-active {
    border-color: #fff;
  }
}
</style>
