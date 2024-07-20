import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input/Input";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { addCaterogyFormSchema } from "../../schemas";
import { Button } from "..";

interface FormData {
  category: string;
}

export const AddCaterogyForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(addCaterogyFormSchema),
  });

  const onSubmit = (category: FormData) => {
    console.log(category);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        name={"category"}
        placeholder="Введіть назву категорії"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        Додати категорію
      </Button>
    </form>
  );
};
