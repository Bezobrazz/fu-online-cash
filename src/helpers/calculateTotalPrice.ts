import type { CartItem } from "../types";

export const calculateTotalPrice = (cartList: CartItem[]) => {
  const total = cartList.reduce((total, item) => {
    return total + item.productPrice * item.quantity;
  }, 0);
  return total.toFixed(2);
};
