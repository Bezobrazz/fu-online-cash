export interface SalePoint {
  id: string;
  title: string;
  enterpriseId: string;
}
export interface NewSalePoint extends Omit<SalePoint, "id"> {}
