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
import {
  addSalePoint,
  editSalePoint,
  selectIsLoadingSalePoints,
} from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";

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

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoadingSalePoints);

  useEffect(() => {
    if (isEdit) {
      item && setValue("title", item.title);
    }
  }, [isEdit, item, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isEdit) {
      const id = item?.id;
      id &&
        dispatch(editSalePoint({ id, ...data }))
          .unwrap()
          .then(() => {
            toast.success(`Торгова точка успішно оновлена`);
            reset();
            toggleModal();
          })
          .catch((error) => {
            toast.error(`Не вдалося оновити торгову точку: ${error.message}`);
          });
    } else {
      const newSalePoint = {
        ...data,
        isActive: true,
        enterpriseId: "12idasidajok31",
      };
      dispatch(addSalePoint(newSalePoint))
        .unwrap()
        .then(() => {
          toast.success(
            `Торгова точка «${newSalePoint.title}» була успішно додана до списку.`
          );
          reset();
          toggleModal();
        })
        .catch((error) => {
          const errorMessage = (error as Error).message || "Unknown error";
          toast.error(`Не вдалося створити торгову точку: ${errorMessage}.`);
        });
    }
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
      <Button type="submit" className="primary-btn" disabled={isLoading}>
        {isEdit ? "Зберегти" : "Додати торгову точку"}
      </Button>
    </form>
  );
};
