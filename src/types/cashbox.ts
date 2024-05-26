import { SalePoint } from "./salePoint.ts";
import { User } from "./user.ts";

export interface Cashbox {
  id: string;
  title: string;
  employee: User;
  salePoint: SalePoint;
}
