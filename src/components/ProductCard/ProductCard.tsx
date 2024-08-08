import { FC, useEffect, useState } from "react";
import { getRandomPastelColor } from "../../helpers/getRandomPastelColor";

interface ProductCardProps {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productInitials: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  productName,
  productQuantity,
  productPrice,
  productInitials,
}) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const color = getRandomPastelColor();
    setBgColor(color);
  }, []);
  return (
    <div className="w-70 p-2 pb-10 border-b-2 cursor-pointer">
      <div
        className="bg-emerald-400 h-24 w-40 p-2 rounded"
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-3xl text-white">{productInitials}</p>
      </div>
      <p className="text-base font-thin text-slate-500">
        Залишок: {productQuantity}
      </p>
      <h3 className="font-bold text-lg">{productName}</h3>
      <p className="text-xl">{productPrice} грн</p>
    </div>
  );
};
