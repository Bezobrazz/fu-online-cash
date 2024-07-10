import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsCash } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { BiTrashAlt } from "react-icons/bi";

import { Button, CartList, CheckList } from "../components";

import { deleteCheck, selectCartList } from "../redux";
import { calculateTotalPrice } from "../helpers";
import { useAppDispatch } from "../hooks";
import { CartItem } from "../types";

export const Cart = () => {
  const cartList = useSelector(selectCartList);

  const { checkId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [productsInCart, setProductsInCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkToDelete, setCheckToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!cartList) return;

    const check = cartList.find((item) => item.checkId === checkId);

    if (!cartList.length && !check?.productList.length) {
      navigate("/create-sale");
    }

    if (!check) return;
    setProductsInCart(check.productList);

    setTotalPrice(calculateTotalPrice(productsInCart));
  }, [cartList, checkId, productsInCart, navigate]);

  useEffect(() => {
    if (
      checkToDelete &&
      !cartList.find((item) => item.checkId === checkToDelete)
    ) {
      const newCheckId = cartList[cartList.length - 1]?.checkId;
      navigate(`/cart/${newCheckId}`);
      setCheckToDelete(null);
    }
  }, [cartList, checkToDelete, navigate]);

  const handleDeleteCheck = () => {
    if (checkId) {
      setCheckToDelete(checkId);
      dispatch(deleteCheck({ checkId }));
    }
  };

  return (
    <section className="py-5">
      <div className="pb-3 mb-5 border-b-2 border-dashed border-b-slate-400">
        <p className="text-[20px] font-bold mb-2">Оберіть чек</p>
        <div className="flex gap-4 items-end">
          <CheckList {...{ cartList }} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <CartList {...{ productsInCart }} />
        <div className="p-3  border-t-4 border-t-teal-400 rounded-lg">
          <p className="flex justify-between items-center text-slate-400 mb-2">
            Сума до сплати{" "}
            <span className="font-semibold text-[22px] text-black">
              {totalPrice}₴
            </span>
          </p>

          <div className="flex justify-between md:justify-start md:gap-4">
            <button
              type="button"
              className="group p-3 border-2 border-teal-500 rounded-md"
              onClick={handleDeleteCheck}
            >
              <BiTrashAlt
                className="fill-teal-500 group-hover:scale-125 group-focus:scale-125 group-active:scale-125 transition duration-300"
                size={20}
              />
            </button>
            <Button
              type="button"
              className="primary-btn justify-between flex items-center"
            >
              <FiCreditCard size={20} />
              Картка
            </Button>
            <Button
              type="button"
              className="group primary-btn justify-between flex items-center "
            >
              <BsCash size={20} /> Готівка
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
