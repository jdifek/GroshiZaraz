/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export interface MfoRating {
  value: number;
  label: string;
}

export interface MfoCreditOffer {
  title: string;
  amount: {
    from: number;
    to: number;
    currency: string;
    formatted: string;
  };
  term: {
    from: number;
    to: number;
    unit: string;
    formatted: string;
  };
  rate: {
    value: number;
    formatted: string;
  };
  real_annual_rate: {
    from: number;
    to: number;
    formatted: string;
  };
}
export interface LoginPage {
  meta_title: string;
  meta_description: string;
  h1_title: string;
  content: string;
  published_at: string;
  updated_at: string;
  schema_markup: Record<string, any>;
}

export interface MfoCatalogOffer {
  id: number;
  client_type: "new" | "repeat";
  amount_from: number;
  amount_to: number;
  term_from: number;
  term_to: number;
  rate: number;
  real_annual_rate_from: number;
  real_annual_rate_to: number;
}

export interface MfoDetails {
  id: number;
  slug: string;
  name: string;
  h1_title: string;
  meta_title: string;
  meta_description: string;
  legal_entity: string;
  nbu_license: string;
  rating_average: number;
  rating_count: number;
  ratings: Record<string, MfoRating>;
  logo_url: string;
  apply_url: string;
  official_website: string;
  redirect_url: string;
  credit_offers: {
    new_client?: MfoCreditOffer;
    repeat_client?: MfoCreditOffer;
  };
  quick_info: {
    amount_range: string;
    term_range: string;
    rate: string;
    rpc_range: string;
  };
  catalog_offers: MfoCatalogOffer[];
  user_warning: string;
  basic_characteristics: string;
  basic_characteristics_pdf_url?: string;
  user_warning_pdf_url?: string;
  created_at: string;
  updated_at: string;
  login_page: LoginPage;

  [key: string]: any;
}

export const getMfoDetails = async (slug: string, lang: "uk" | "ru" | "en" = "uk"): Promise<MfoDetails> => {
  const response = await axios.get<MfoDetails>(`https://mfo.qissseee.tech/api/v1/mfos/${slug}`, {
    params: {
      lang,
    },
  });
  return response.data;
};
