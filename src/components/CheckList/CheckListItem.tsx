import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BsDatabaseCheck } from "react-icons/bs";

import { AddButton } from "../../components";

import { createCheck, selectCartList } from "../../redux";
import { calculateTotalPrice } from "../../helpers";
import { CartList } from "../../types";

interface CheckListItemProps {
  item: CartList;
  index: number;
}

export const CheckListItem: React.FC<CheckListItemProps> = ({
  item: { checkId, productList },
  index,
}) => {
  const { checkId: currentCheckId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartList = useSelector(selectCartList);

  const handleAddBtnClick = () => {
    const id = Math.random().toString(36).slice(2);
    dispatch(createCheck({ checkId: id }));
    navigate(`/create-sale/${id}`);
  };

  const totalPrice = calculateTotalPrice(productList);
  return (
    <li className="flex gap-2 items-center">
      <Link
        to={`/cart/${checkId}`}
        className={`flex gap-5 md:gap-3 items-center py-2 px-4 text-slate-100 lg:text-[18px] font-semibold bg-teal-500 rounded-md active:bg-teal-600 focus:bg-teal-600 lg:hover:bg-teal-600 transition duration-300 ${
          checkId === currentCheckId && "outline outline-4 outline-slate-400"
        }`}
      >
        <BsDatabaseCheck className="size-5" /> {totalPrice}₴
      </Link>
      {index === cartList.length - 1 && (
        <AddButton onClick={handleAddBtnClick} />
      )}
    </li>
  );
};
