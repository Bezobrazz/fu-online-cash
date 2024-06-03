interface Money {
  card: number;
  cash: number;
}

export interface Cashbox {
  id: string;
  title: string;
  employee: string;
  salePoint: string;
  money: Money;
  isOpen: boolean;
  openTime: Date;
  closeTime: Date;
}
