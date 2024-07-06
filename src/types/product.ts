export interface BaseProduct {
  name: string;
  article: string;
  category: string;
  price: number;
  salePoint: string;
}

export interface Product extends BaseProduct {
  id: string;
}
