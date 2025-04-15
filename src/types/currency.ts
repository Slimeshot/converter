export type TCurrency = 'BYN' | 'EUR' | 'JPY' | 'RUB' | 'USD';

export interface ICurrencyData {
  code: string;
  value: number;
}
export type TCurrencyRates = Record<TCurrency, ICurrencyData>;

export interface IResponseCurrencyLatest {
  meta: {
    last_updated_at: string;
  };
  data: TCurrencyRates;
}

export interface IRequestParamsCurrencyLatest {
  base_currency: string;
  currencies: string;
}
