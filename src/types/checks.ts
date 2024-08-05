import type { ProductSummary } from "./product";

export interface Check {
  id: string;
  article: number;
  info: {
    productds: ProductSummary[];
    employeeName: string;
    totalSum: number;
  };
  isComplited: boolean;
  createdAd: string;
  cashboxId: string;
  enterpriseId: string;
  salePointId: string;
}
