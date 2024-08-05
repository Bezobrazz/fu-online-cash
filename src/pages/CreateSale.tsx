import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";

import { CategoriesBar, ProductCard } from "../components";

import { useAppDispatch } from "../hooks";
import {
  addCartItem,
  deleteCheck,
  selectCartList,
} from "../redux/cart/cartSlice";
import type { CartItem, CartProduct } from "../types";

const CreateSale = () => {
  const cartList = useSelector(selectCartList);

  const { checkId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [productsInCart, setProductsInCart] = useState<CartItem[]>([]);
  const [isCartLinkActive, setIsCartLinkActive] = useState(false);

  const [currentCheckId, setCurrentCheckId] = useState<string | null>(
    checkId ? checkId : null
  );

  useEffect(() => {
    if (cartList.length && !cartList[cartList.length - 1].productList.length) {
      setCurrentCheckId(cartList[cartList.length - 1].checkId);
    }
  }, [cartList]);

  useEffect(() => {
    if (!cartList) return;

    if (!checkId) {
      setProductsInCart([]);
      setIsCartLinkActive(false);

      if (
        cartList.length &&
        !cartList[cartList.length - 1]?.productList.length &&
        currentCheckId
      ) {
        dispatch(deleteCheck({ checkId: currentCheckId }));
      }
    }
    const check = cartList.find((item) => item.checkId === checkId);

    if (!check) return;

    setProductsInCart(check.productList);

    if (productsInCart.length > 0) {
      setIsCartLinkActive(true);
    } else {
      setIsCartLinkActive(false);
    }
  }, [dispatch, cartList, checkId, currentCheckId, productsInCart.length]);

  const handleProductToCart = (product: CartProduct) => {
    if (checkId && currentCheckId) {
      dispatch(addCartItem({ checkId: currentCheckId, product }));
    } else {
      const id = Math.random().toString(36).slice(2);
      setCurrentCheckId(id);
      dispatch(addCartItem({ checkId: id, product }));
      navigate(`/create-sale/${id}`);
    }
  };

  const products: CartProduct[] = [
    {
      productName: "Кора Крупна",
      productQuantity: 345,
      productPrice: 150,
    },
    {
      productName: "Кора Середня",
      productQuantity: 214,
      productPrice: 150,
    },
    {
      productName: "Кора Дрібна",
      productQuantity: 124,
      productPrice: 130,
    },
  ];

  const getProductInitials = (name: string): string => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0)).join("");
    return initials;
  };

  const combinedProducts = productsInCart.reduce((acc: CartItem[], item) => {
    const existingItemIndex = acc.findIndex(
      (product) => product.productName === item.productName
    );
    if (existingItemIndex > -1) {
      acc[existingItemIndex].quantity += item.quantity;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const totalItemsInCart = combinedProducts?.length;
  const totalCartValue = productsInCart.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  return (
    <div className="flex h-full lg:flex-col gap-2">
      <CategoriesBar />
      <div className="flex flex-col gap-4 relative">
        <div className="flex min-h-[226px] max-h-[80%] gap-4 flex-wrap overflow-y-auto">
          {products.map((item, index) => (
            <div key={index} onClick={() => handleProductToCart(item)}>
              <ProductCard
                productName={item.productName}
                productQuantity={item.productQuantity}
                productPrice={item.productPrice}
                productInitials={getProductInitials(item.productName)}
              />
            </div>
          ))}
        </div>
        {isCartLinkActive && (
          <Link
            to={`/cart/${currentCheckId}`}
            className="w-full h-20 bg-teal-500 p-2 rounded flex items-center justify-between absolute bottom-0 lg:bottom-[-90px] left-0"
          >
            <p className="text-white text-lg">
              Товарів у кошику: {totalItemsInCart} / {totalCartValue} грн
            </p>
            <AiOutlineDoubleRight className="text-white" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CreateSale;
