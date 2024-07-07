export interface CartProduct {
  productName: string;
  productQuantity: number;
  productPrice: number;
}
export interface CartItem extends CartProduct {
  quantity: number;
}

export interface CartList {
  checkId: string;
  productList: CartItem[];
}
