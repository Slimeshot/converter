import { ref } from 'vue';
import { defineStore } from 'pinia';
import { LIST_DEFAULT_CURRENCY } from '@/constants/currency';
import type { ISelectOption } from '@/components/ui/selects/ui-select/types';
import { loadListCurrency } from '@/services/currency';
import { STORAGE_CURRENCY_KEY } from '@/constants/app';
import type {
  IRequestParamsCurrencyLatest,
  TCurrencyRates,
} from '@/types/currency';

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref(LIST_DEFAULT_CURRENCY[0]);
  const baseRate = ref<TCurrencyRates | null>(null);

  async function setBaseCurrency(currency: ISelectOption) {
    baseCurrency.value = currency;
    baseRate.value = await getBaseCurrencyRate(currency);
  }

  async function getBaseCurrencyRate(
    currency: ISelectOption
  ): Promise<TCurrencyRates | null> {
    const storageKey = `${STORAGE_CURRENCY_KEY}-${currency.name.toLocaleLowerCase()}`;
    const storageData = localStorage.getItem(storageKey);

    if (storageData) {
      const { data, time } = JSON.parse(storageData);
      const currentTimeInMs = Date.now();
      const diffTime = currentTimeInMs - time;
      const hourInMs = 1000 * 60 * 60;

      if (diffTime < hourInMs) {
        return data;
      }
    }

    try {
      const reqParams: IRequestParamsCurrencyLatest = {
        base_currency: currency.name,
        currencies: LIST_DEFAULT_CURRENCY.map((item) => item.name).join(','),
      };
      const response = await loadListCurrency(reqParams);
      const currentTimeInMs = Date.now();
      const storageData = {
        data: response.data.data,
        time: currentTimeInMs,
      };

      localStorage.setItem(storageKey, JSON.stringify(storageData));
      return response.data.data;
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      return null;
    }
  }

  return {
    baseCurrency,
    baseRate,
    setBaseCurrency,
    getBaseCurrencyRate,
  };
});
