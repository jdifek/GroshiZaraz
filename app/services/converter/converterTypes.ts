export interface ConvertResponse {
  result: string;
  rate: string;
}

interface Rate {
  cc: string;
  rate: number;
  txt: string;
}
export interface Dynamics {
  [key: string]: {
    currency: string;
    startRate: number;
    endRate: number;
    changePercent: string;
    direction: 'up' | 'down';
  };
}
export interface RatesResponse {
  date: string;
  rates: Rate[];
}