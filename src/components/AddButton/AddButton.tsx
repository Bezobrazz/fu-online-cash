import { ButtonHTMLAttributes } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}
export const AddButton = ({ size = "40", ...props }: AddButtonProps) => {
  const buttonSize = `${size}px`;
  return (
    <button
      type="button"
      className={`group flex justify-center items-center bg-slate-300 rounded-md hover:bg-slate-500 focus:bg-slate-500 active:bg-slate-500 transition duration-300`}
      style={{ width: buttonSize, height: buttonSize }}
      {...props}
    >
      <AiOutlinePlus className="group-hover:fill-white group-focus:fill-white group-active:fill-white transition duration-300" />
    </button>
  );
};
