export interface CartProduct {
  productName: string;
  productQuantity: number;
  productPrice: number;
}
export interface CartItem extends CartProduct {
  quantity: number;
  name: string;
  article: string;
  price: number;
  salePointId: string;
}

export interface CartList {
  checkId: string;
  productList: CartItem[];
}
