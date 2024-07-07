import { Link } from "react-router-dom";
import { BsDatabaseCheck } from "react-icons/bs";

import { calculateTotalPrice } from "../../helpers";
import { CartList } from "../../types";

interface CheckListItemProps {
  item: CartList;
}

export const CheckListItem: React.FC<CheckListItemProps> = ({
  item: { checkId, productList },
}) => {
  const totalPrice = calculateTotalPrice(productList);
  return (
    <li>
      <Link
        to={`/cart/${checkId}`}
        className="flex gap-4 items-center py-2 px-4 text-slate-100 font-semibold bg-teal-500 rounded-md active:bg-teal-600 focus:bg-teal-600 lg:hover:bg-teal-600 transition duration-300"
      >
        <BsDatabaseCheck /> {totalPrice}₴
      </Link>
    </li>
  );
};
