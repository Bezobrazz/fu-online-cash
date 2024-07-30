import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Button } from "..";

import { editSalePointFormSchema } from "../../schemas";

interface FormData {
  title: string;
}

export const EditSalePointForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(editSalePointFormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const salePoint = { ...data, enterpriseId: "12idasidajok31" };
    console.log(salePoint);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 py-6 px-7 w-[360px]"
    >
      <p>Назва:</p>
      <Input
        name="title"
        type="text"
        placeholder="Введіть назву торгової точки"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        Додати торгову точку
      </Button>
    </form>
  );
};
