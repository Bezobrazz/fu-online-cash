import { CartList } from "../../types";
import { CheckListItem } from "./CheckListItem";

interface CheckListProps {
  cartList: CartList[];
}

export const CheckList: React.FC<CheckListProps> = ({ cartList }) => {
  return (
    <ul className="flex gap-2">
      {cartList.map((item, index) => (
        <CheckListItem key={index} {...{ item }} />
      ))}
    </ul>
  );
};
