export interface BaseProduct {
  name: string;
  article: string;
  category: string;
  price: number;
  quantity: number;
  salePointId: string;
}

export interface Product extends BaseProduct {
  id: string;
}
