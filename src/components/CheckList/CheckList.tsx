import { CartList } from "../../types";
import { CheckListItem } from "./CheckListItem";

interface CheckListProps {
  cartList: CartList[];
}

export const CheckList: React.FC<CheckListProps> = ({ cartList }) => {
  return (
    <ul className="flex flex-wrap gap-4 md:gap-2 lg:gap-4">
      {cartList.map((item, index) => (
        <CheckListItem key={index} {...{ item, index }} />
      ))}
    </ul>
  );
};
