import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "number";
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
  autoComplete = "on",
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
    <div className="relative">
      <label className="label">
        {label}
        <input {...inputProps} />
      </label>
      {errorMessage && <p className="field-error">{errorMessage}</p>}
    </div>
  );
};
