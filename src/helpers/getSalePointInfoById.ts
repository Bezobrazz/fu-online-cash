import type { SalePoint } from "../types";

export const getSalePointInfoById = (
  salePoints: SalePoint[],
  salePointId: string
): SalePoint | null => {
  const salePoint = salePoints.find((item) => item.id === salePointId);
  return salePoint || null;
};
