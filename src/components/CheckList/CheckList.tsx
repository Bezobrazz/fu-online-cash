import { FC } from "react";

import { CheckListItem } from "./CheckListItem";

import type { CartList } from "../../types";

interface CheckListProps {
  cartList: CartList[];
}

export const CheckList: FC<CheckListProps> = ({ cartList }) => {
  return (
    <ul className="flex flex-wrap gap-4 md:gap-2 lg:gap-4">
      {cartList.map((item, index) => (
        <CheckListItem key={index} {...{ item, index }} />
      ))}
    </ul>
  );
};
