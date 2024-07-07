import { ButtonHTMLAttributes } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}
export const AddButton = ({ size = "40", ...props }: AddButtonProps) => {
  return (
    <button
      type="button"
      className={`group flex justify-center items-center w-[${size}px] h-[${size}px] bg-slate-300 rounded-md hover:bg-slate-500 focus:bg-slate-500 active:bg-slate-500 transition duration-300`}
      {...props}
    >
      <AiOutlinePlus className="group-hover:fill-white group-focus:fill-white group-active:fill-white transition duration-300" />
    </button>
  );
};
