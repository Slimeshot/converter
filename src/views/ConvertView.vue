<template>
  <div class="converter">
    <h1 class="converter__title">Конвертер</h1>
    <div class="converter__current-price">
      <AnimatedNumber :to="currentCurrencyPrice || 0" :decimal-places="0" />
      {{ currentCurrency.name }} равно
    </div>
    <div class="converter__convert-price">
      <AnimatedNumber :to="convertCurrencyPrice || 0" :decimal-places="0" />
      {{ convertCurrency.name }}
    </div>
    <div class="converter__group">
      <div class="converter__block converter__block_current">
        <ui-input
          class="converter__input"
          input-type="number"
          placeholder="Введите число"
          v-model="currentCurrencyPrice"
          @focus="setActiveInput('currentCurrencyPrice')"
        />
        <ui-select
          class="converter__select"
          :options="LIST_DEFAULT_CURRENCY"
          v-model="currentCurrency"
          hide-placeholder
        />
      </div>
      <button class="converter__swap" @click="swapCurrencies">
        <IconArrows class="converter__icon-arrow" />
      </button>
      <div class="converter__block converter__block_converted">
        <ui-input
          class="converter__input"
          input-type="number"
          placeholder="Введите число"
          v-model="convertCurrencyPrice"
          @focus="setActiveInput('convertCurrencyPrice')"
        />

        <ui-select
          class="converter__select"
          :options="LIST_DEFAULT_CURRENCY"
          hide-placeholder
          v-model="convertCurrency"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import AnimatedNumber from '@/components/AnimatedNumber.vue'
import UiSelect from '@/components/ui/selects/ui-select/index.vue'
import UiInput from '@/components/ui/inputs/ui-input/index.vue'
import { LIST_DEFAULT_CURRENCY } from '@/constants/currency'
import type { ISelectOption } from '@/components/ui/selects/ui-select/types'
import IconArrows from '@/assets/icons/arrows.svg?component'
import { useCurrencyStore } from '@/stores/currency'
import type { TCurrencyRates } from '@/types/currency'

type TActiveInput = 'currentCurrencyPrice' | 'convertCurrencyPrice'

const currencyStore = useCurrencyStore()

const currentCurrencyPrice = ref<number | null>(null)
const convertCurrencyPrice = ref<number | null>(null)

const currentCurrency = ref<ISelectOption>(LIST_DEFAULT_CURRENCY[0])
const convertCurrency = ref<ISelectOption>(LIST_DEFAULT_CURRENCY[1])

const rateTo = ref<TCurrencyRates | null>(null)
const activeInput = ref<TActiveInput | null>(null)

function setActiveInput(input: TActiveInput): void {
  activeInput.value = input
}

async function updateRates(): Promise<void> {
  const baseRate = await currencyStore.getBaseCurrencyRate(currentCurrency.value)
  if (baseRate) {
    rateTo.value = baseRate
    updatePrices()
  }
}

function swapCurrencies(): void {
  ;[currentCurrency.value, convertCurrency.value] = [convertCurrency.value, currentCurrency.value]
}

function updatePrices(): void {
  if (!rateTo.value) {
    return
  }

  const rate = rateTo.value[convertCurrency.value.name as keyof TCurrencyRates]?.value

  if (!rate) {
    return
  }

  if (activeInput.value === 'currentCurrencyPrice') {
    convertCurrencyPrice.value = parseFloat(((currentCurrencyPrice.value || 0) * rate).toFixed(2))
    return
  }

  currentCurrencyPrice.value = parseFloat(((convertCurrencyPrice.value || 0) / rate).toFixed(2))
}

watch([currentCurrency, convertCurrency], () => {
  updateRates()
})
watch(currentCurrencyPrice, () => {
  if (activeInput.value === 'currentCurrencyPrice') {
    updatePrices()
  }
})

watch(convertCurrencyPrice, () => {
  if (activeInput.value === 'convertCurrencyPrice') {
    updatePrices()
  }
})

onMounted(() => {
  updateRates()
})
</script>

<style lang="scss" scoped>
.converter {
  &__title {
    font-size: 42px;
    margin-bottom: 32px;

    @media (max-width: 540px) {
      font-size: 32px;
    }
  }

  &__current-price {
    font-size: 18px;
    color: rgb(176, 175, 175);
    margin-bottom: 4px;

    @media (max-width: 540px) {
      font-size: 16px;
    }
  }

  &__convert-price {
    font-size: 28px;
    margin-bottom: 32px;

    @media (max-width: 540px) {
      font-size: 24px;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    row-gap: 16px;
  }

  &__swap {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  &__icon-arrow {
    width: 20px;
    height: 20px;
  }

  &__block {
    display: flex;
  }

  &__input {
    max-width: 150px;
    margin-right: 8px;
  }
}
</style>
