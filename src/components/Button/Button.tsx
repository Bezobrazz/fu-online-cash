import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
  type: "submit" | "reset" | "button" | undefined;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  type,
  ...props
}) => {
  return (
    <button className={`btn-style ${className}`} type={type} {...props}>
      {children}
    </button>
  );
};
