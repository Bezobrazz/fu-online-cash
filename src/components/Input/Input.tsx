import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "number" | "tel";
  placeholder: string;
  defaultValue?: string | number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  autoComplete?: string;
}

export const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  register,
  errors,
  autoComplete = "off",
}: InputProps) => {
  const inputProps = {
    className: "field",
    type,
    placeholder,
    defaultValue,
    ...register(name),
    autoComplete,
  };

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div
      className={`relative ${
        name === "phone"
          ? `before:text-[18px] before:content-['+380'] before:absolute before:top-[56%] before:left-[10px]  `
          : ""
      }`}
    >
      <label className="label">
        {label}
        <input
          {...inputProps}
          style={name === "phone" ? { paddingLeft: "50px" } : {}}
        />
      </label>
      {errorMessage && <p className="field-error">{errorMessage}</p>}
    </div>
  );
};
