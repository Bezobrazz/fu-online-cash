import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type?: "text" | "number";
  placeholder: string;
  defaultValue?: string | number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  register,
  errors,
}: InputProps) => {
  const inputProps = {
    className: "field",
    type,
    placeholder,
    defaultValue,
    ...register(name),
  };

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="label">
        {label}
        <input {...inputProps} />
      </label>
      {errorMessage && <p className="field-error">{errorMessage}</p>}
    </div>
  );
};
