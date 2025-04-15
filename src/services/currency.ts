import currencyApi from '@/api/currency';
import type {
  IResponseCurrencyLatest,
  IRequestParamsCurrencyLatest,
} from '@/types/currency';
import type { AxiosResponse } from 'axios';

export function loadListCurrency(
  params: IRequestParamsCurrencyLatest
): Promise<AxiosResponse<IResponseCurrencyLatest>> {
  return currencyApi.get('/latest', {
    params,
  });
}
