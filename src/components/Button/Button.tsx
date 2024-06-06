import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
  type: "submit" | "reset" | "button" | undefined;
}

export const Button = ({
  className,
  children,
  type,
  ...props
}: ButtonProps) => {
  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
};
