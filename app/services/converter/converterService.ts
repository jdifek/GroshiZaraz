/* eslint-disable @typescript-eslint/no-explicit-any */
import $api from "../http";
import { ConvertResponse, RatesResponse } from "./converterTypes";

export default class ConverterService {
  static async RatesGet(): Promise<RatesResponse> {
    return (await $api.get<RatesResponse>(`/api/rates`)).data;
  }
  static async DynamicsGet({
    currency,
  }: {
    currency: string;
  }): Promise<any> {
    return (await $api.get<any>(`/api/dynamics?valcode=${currency}`))
      .data;
  }
  static async SwapCurrencies({
    toCurrency,
    tempFrom,
    tempAmount
  }: {
    toCurrency: string;
    tempFrom: string;
    tempAmount: string;
  }): Promise<ConvertResponse> {
    return (await $api.get<ConvertResponse>(`/api/convert?from=${toCurrency}&to=${tempFrom}&amount=${tempAmount}`))
      .data;
  }
  static async AmountChange({
    fromCurrency,
    toCurrency,
    value
  }: {
    fromCurrency: string;
    toCurrency: string;
    value: string;
  }): Promise<ConvertResponse> {
    return (await $api.get<ConvertResponse>(`/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${value}`))
      .data;
  }
}
