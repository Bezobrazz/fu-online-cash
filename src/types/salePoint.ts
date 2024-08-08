export interface SalePoint {
  id: string;
  title: string;
  isActive: boolean;
  enterpriseId: string;
}
export interface NewSalePoint extends Omit<SalePoint, "id"> {}
