import { SalePoint } from ".";

export interface Product {
  id: string;
  name: string;
  article: string;
  price: number;
  salePoint: SalePoint;
}
