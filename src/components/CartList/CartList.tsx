import { CartListItem } from "./CartListItem";

import { CartItem } from "../../types";

interface CartListProps {
  productsInCart: CartItem[];
}

export const CartList: React.FC<CartListProps> = ({ productsInCart }) => {
  if (!productsInCart) return;

  return (
    <ul className="mb-10">
      {productsInCart.map((item, index) => (
        <CartListItem key={index} {...{ item }} />
      ))}
    </ul>
  );
};
