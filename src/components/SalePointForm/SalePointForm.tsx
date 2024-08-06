import { FC, useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Button } from "..";

import { salePointFormSchema } from "../../schemas";
import type { SalePoint } from "../../types";

interface FormData {
  title: string;
}

interface SalePointFormProps {
  item?: SalePoint;
  isEdit?: boolean;
  toggleModal: () => void;
}

export const SalePointForm: FC<SalePointFormProps> = ({
  item,
  isEdit,
  toggleModal,
}) => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(salePointFormSchema),
  });

  useEffect(() => {
    if (isEdit) {
      item && setValue("title", item.title);
    }
  }, [isEdit, item, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const salePoint = { ...data, enterpriseId: "12idasidajok31" };
    console.log(salePoint);
    reset();
    toggleModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <Input
        label="Назва:"
        name="title"
        type="text"
        placeholder="Введіть назву торгової точки"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        {isEdit ? "Зберегти" : "Додати торгову точку"}
      </Button>
    </form>
  );
};
