export interface Cashbox {
  id: string;
  title: string;
  card: number;
  cash: number;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
  employeeId: string;
  salePointId: string;
}

export interface NewCashbox extends Omit<Cashbox, "id"> {}
