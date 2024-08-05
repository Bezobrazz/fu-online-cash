export interface Cashbox {
  id: string;
  title: string;
  card: number;
  cash: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  employeeId: string;
  salePointId: string;
}
