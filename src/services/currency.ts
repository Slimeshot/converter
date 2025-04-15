import currencyApi from '@/api/currency';
import type { IRequestParamsCurrencyLatest, IResponseCurrencyLatest } from '@/types/currency';
import type { AxiosResponse } from 'axios';

export function loadListCurrency(
  params: IRequestParamsCurrencyLatest
): Promise<AxiosResponse<IResponseCurrencyLatest>> {
  return currencyApi.get('/latest', {
    params,
  });
}
