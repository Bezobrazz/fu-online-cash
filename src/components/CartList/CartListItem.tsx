import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

import {
  decrementCartItemQuantity,
  deleteCartItem,
  incrementCartItemQuantity,
  selectCartList,
} from "../../redux";
import { useAppDispatch } from "../../hooks";
import type { CartItem } from "../../types";

interface CartListItemProps {
  item: CartItem;
}

export const CartListItem: FC<CartListItemProps> = ({
  item: { productName, productPrice, productQuantity, quantity },
}) => {
  const cartList = useSelector(selectCartList);

  const { checkId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartList.find((item) => item.checkId === checkId)) {
      navigate(`/cart/${cartList[cartList.length - 1]?.checkId}`);
    }
  }, [cartList, checkId, navigate]);

  const handleIncrementQuantity = () => {
    checkId && dispatch(incrementCartItemQuantity({ checkId, productName }));
  };

  const handleDecrementQuantity = () => {
    checkId && dispatch(decrementCartItemQuantity({ checkId, productName }));
  };

  const handleDeleteProduct = () => {
    checkId && dispatch(deleteCartItem({ checkId, productName }));
  };

  return (
    <li className="py-4 border-b border-b-slate-400">
      <div className="mb-2">
        <h3 className="text-[24px] font-bold mb-1">{productName}</h3>
        <p className="text-slate-400">Залишок: {productQuantity}</p>
      </div>
      <div className="flex gap-6 font-semibold">
        <div className="px-3 py-2 flex justify-between w-[150px] border-2 border-slate-300 rounded-md">
          <button type="button" onClick={handleDecrementQuantity}>
            <AiOutlineMinus />
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={handleIncrementQuantity}>
            <AiOutlinePlus />
          </button>
        </div>
        <div className="px-3 py-2 flex justify-between w-[150px] border-2 border-slate-300 rounded-md">
          <span>₴</span> <span>{productPrice.toFixed(2)}</span>
        </div>
        <button
          type="button"
          className="group px-3 border-2 border-slate-300 rounded-md hover:border-teal-500 focus:border-teal-500 active:border-teal-500 transition duration-300"
          onClick={handleDeleteProduct}
        >
          <BiTrashAlt className="group-hover:fill-teal-500 group-focus:fill-teal-500 group-active:fill-teal-500 transition duration-300" />
        </button>
      </div>
    </li>
  );
};
