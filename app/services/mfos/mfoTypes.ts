/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Mfo {
  id: number;
  name: string;
  slug: string;
  commission: string;
  rating: number;
  reviews: any;
  logo: string;
  licenseNumber?: string;
  isActive: boolean;

  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  rateMin: number;
  rateMax: number;
  approvalRate: number;
  decisionTime: string;
  application: string;
  collateral: string;
  dailyRate: string;

  isFirstLoanZero: boolean;
  isInstantApproval: boolean;
  isNoIncomeProof: boolean;
  is24Support: boolean;
  isSafeTransactions: boolean;
  isFlexibleTerms: boolean;

  ageFrom: number;
  ageTo: number;
  citizenship: string;
  documents: string;

  description?: string;
  phone?: string;
  website?: string;
  workTimeWeekdays?: string;
  workTimeWeekend?: string;
  workTimeOnline?: string;
  UtmLink: string;
  createdAt: string;
  updatedAt: string;
  promoCodes: any[]
  questions: any[]
}

export type MfoPayload = Omit<Mfo, "id" | "createdAt" | "updatedAt">;
export interface RandomKey {
  nameRu: string;
  nameUk: string;
  slugRu: string;
  slugUk: string;
}
